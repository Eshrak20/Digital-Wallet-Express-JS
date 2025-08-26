/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { IAuthProvider, IUser, Role } from "./user.interface";
import AppError from "../../errorHelpers/AppError";
import { UserModel } from "./user.model";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { WalletModel } from "../wallet/wallet.model";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, role = "USER", ...rest } = payload;

  if (!email || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required."
    );
  }

  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists.");
  }

  const hashedPassword = await bcryptjs.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUND) || 10
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email,
  };

  const user = await UserModel.create({
    email,
    password: hashedPassword,
    role,
    auths: [authProvider],
    is_active: "ACTIVE",
    is_verified: true,
    ...rest,
  });

  // Create wallet with initial balance ৳50
  await WalletModel.create({
    user: user._id,
    balance: 50,
    status: "ACTIVE",
  });

  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const ifUserExist = await UserModel.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (payload.role === Role.ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are Already an Admin");
    }
  }

  if (payload.is_active || payload.is_verified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.password) {
    const salt = await bcryptjs.genSalt(Number(envVars.BCRYPT_SALT_ROUND));
    payload.password = await bcryptjs.hash(payload.password, salt);
  }

  const newUpdatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

const myProfile = async (id: string) => {
  const user = await UserModel.findById(id).select("-password");

  if (!user) {
    throw new Error("User not found");
  }
  return { data: user };
};

const getAllUsers = async (query: Record<string, any>) => {
  const baseQuery = UserModel.find({ role: "USER" });
  const queryBuilder = new QueryBuilder(baseQuery, query);

  const userQuery = queryBuilder
    .search(["phone", "email", "address"]) // only string fields
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    userQuery.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};


const getAllAgents = async (query: Record<string, any>) => {
  const baseQuery = UserModel.find({ role: "AGENT" });
  const queryBuilder = new QueryBuilder(baseQuery, query);

  const userQuery = queryBuilder
    .search(["phone", "email", "_id", "address", "is_active", "is_verified"])
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    userQuery.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};
// My Profile Function

export const UserServices = {
  createUser,
  updateUser,
  getAllUsers,
  getAllAgents,
  myProfile,
};
