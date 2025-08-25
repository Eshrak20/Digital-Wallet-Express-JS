/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryBuilder } from "../../utils/QueryBuilder";
import { ITransactionCreateInput } from "./transaction.interface";
import { TransactionModel } from "./transaction.model";

const createTransaction = async (payload: ITransactionCreateInput) => {
  const transactionPayload = { ...payload };
  const transaction = await TransactionModel.create(transactionPayload);
  return transaction;
};

const getAllTransactionByUserID = async (
  user_id: string,
  query: Record<string, any>
) => {
  const baseQuery = TransactionModel.find({ user: user_id });

  const queryBuilder = new QueryBuilder(baseQuery, query);

  const transactionsQuery = queryBuilder
    .search(["type", "status"]) // example: searchable fields
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    transactionsQuery.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getAllTransaction = async (query: Record<string, any>) => {
  const baseQuery = TransactionModel.find({});
  const queryBuilder = new QueryBuilder(baseQuery, query);
  const transactionsQuery = queryBuilder
    .search(["type", "status"])
    .filter()
    .sort()
    .fields()
    .paginate();
  const [data, meta] = await Promise.all([
    transactionsQuery.build(),
    queryBuilder.getMeta(),
  ]);
  return {
    data,
    meta,
  };
};
export const TransactionService = {
  createTransaction,
  getAllTransaction,
  getAllTransactionByUserID,
};
