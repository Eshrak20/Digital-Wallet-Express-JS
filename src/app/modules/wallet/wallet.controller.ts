/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { WalletService } from "./wallet.service";

const addMoney = catchAsync(async (req: Request, res: Response) => {
  
  const { user_id, amount } = req.body;
  console.log("This taja",amount , user_id);

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
