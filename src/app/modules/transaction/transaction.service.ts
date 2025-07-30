import { ITransactionCreateInput } from "./transaction.interface";
import { TransactionModel } from "./transaction.model";

const createTransaction = async (payload: ITransactionCreateInput) => {
  const transaction = await TransactionModel.create(payload);
  return transaction;
};
const getAllTransaction = async () => {
  const transactions = await TransactionModel.find({});
  const totalTransaction = await TransactionModel.countDocuments();
  return {
    data: transactions,
    meta: {
      total: totalTransaction,
    },
  };
};
export const TransactionService = {
  createTransaction,
  getAllTransaction,
};
