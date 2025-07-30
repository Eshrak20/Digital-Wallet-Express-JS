import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import { IAuthProvider, IUser } from "./user.interface";
import AppError from "../../errorHelpers/AppError";
import { UserModel } from "./user.model";
import { WalletModel } from "../Wallet/wallet.model";
import { envVars } from "../../config/env";

export const UserService = {
  createUser: async (payload: Partial<IUser>) => {
    const { email, password, role = "USER", ...rest } = payload;

    if (!email || !password) {
      throw new AppError(httpStatus.BAD_REQUEST, "Email and password are required.");
    }

    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, Number(envVars.BCRYPT_SALT_ROUND) || 10);

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
  },
};
