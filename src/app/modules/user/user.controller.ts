/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { JwtUserPayload } from "../../interfaces/JwtUserPayload.types";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: result,
    });
  }
);
const updateUserRoleAndStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const payload = req.body;
    const verifiedToken = req.user;
    const user = await UserServices.updateUser(
      userId,
      payload,
      verifiedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Role And Status Updated Successfully",
      data: user,
    });
  }
);
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const verifiedToken = req.user as JwtUserPayload;
    const id = verifiedToken?.userId;
    const user = await UserServices.updateUser(
      id,
      payload,
      verifiedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Updated Successfully",
      data: user,
    });
  }
);







const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers(req.query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Users Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);
const getAllAgents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllAgents(req.query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Agents Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);
const myProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const verifiedToken = req.user as JwtUserPayload;
    const id = verifiedToken?.userId;
    const result = await UserServices.myProfile(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile Retrieved Successfully",
      data: result,
    });
  }
);

export const UserControllers = {
  createUser,
  updateUserRoleAndStatus,
  getAllUsers,
  getAllAgents,
  myProfile,
  updateProfile,
};
