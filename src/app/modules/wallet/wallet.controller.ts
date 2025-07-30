/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { WalletService } from "./wallet.service";

import { Types } from "mongoose";
import { JwtUserPayload } from "../../interfaces/JwtUserPayload.types";

const addMoney = catchAsync(async (req: Request, res: Response) => {
  const { userId: user_id } = req.user as JwtUserPayload;
  const { amount } = req.body;
  const result = await WalletService.addMoney(user_id, amount);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Money added successfully",
    data: result,
  });
});

export const WalletControllers = {
  addMoney,
};
