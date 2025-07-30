import { Types } from "mongoose";

export interface ITransaction {
  user_id: Types.ObjectId;
  type: "add" | "withdraw" | "transfer";
  amount: number;
  status: "pending" | "completed" | "failed";
}

export interface ITransactionCreateInput {
  user_id: Types.ObjectId;
  type: "add" | "withdraw" | "transfer";
  amount: number;
  status: "pending" | "completed" | "failed";
}
