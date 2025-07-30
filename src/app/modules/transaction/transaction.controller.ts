/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TransactionService } from "./transaction.service";

const getAllTransaction = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.getAllTransaction();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Transaction created successfully",
    data: result,
  });
});

export const transactionControllers = {
  getAllTransaction,
};
