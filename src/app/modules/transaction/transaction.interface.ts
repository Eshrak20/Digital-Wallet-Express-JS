import { Types } from "mongoose";
export enum TransactionType {
  ADD = "ADD",
  WITHDRAW = "WITHDRAW",
  TRANSFER = "TRANSFER",
}
export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface ITransaction {
  user: Types.ObjectId;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
}

export interface ITransactionCreateInput {
  user: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
}
