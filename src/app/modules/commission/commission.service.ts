/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryBuilder } from "../../utils/QueryBuilder";
import { CapitalModel } from "../capital/capital.model";
import { AgentCommissionHistoryModel } from "../commission/commission.model";
import mongoose from "mongoose";

export const WithdrawCommission = async (agentId: string, amount: number) => {
  let feeUnit: number;
  let transactionFee: number;

  if (amount >= 1000) {
    feeUnit = Math.floor(amount / 1000);
    transactionFee = feeUnit * 20;
  } else {
    feeUnit = 0.5;
    transactionFee = feeUnit * 20;
  }

  const agentCommission = feeUnit * 10;
  const ownerCommission = transactionFee - agentCommission;

  if (agentId && agentCommission > 0) {
    await AgentCommissionHistoryModel.create({
      agent_id: agentId,
      amount: agentCommission,
    });
  }

  if (ownerCommission > 0) {
    await CapitalModel.findByIdAndUpdate(
      "capital_wallet",
      { $inc: { balance: ownerCommission } },
      { upsert: true, new: true }
    );
  }

  return { transaction_fee: transactionFee, agent_commission: agentCommission };
};
export const TransferFee = async (amount: number) => {
  const transactionFee = amount <= 10000 ? 5 : 10;

  if (transactionFee > 0) {
    await CapitalModel.findByIdAndUpdate(
      "capital_wallet",
      { $inc: { balance: transactionFee } },
      { upsert: true, new: true }
    );
  }

  return { transaction_fee: transactionFee };
};

const getAllCommissionByUserID = async (
  user_id: string,
  query: Record<string, any>
) => {
  const agentObjectId = new mongoose.Types.ObjectId(user_id);

  // ✅ Always inject agent_id into the base filter
  const baseQuery = AgentCommissionHistoryModel.find({
    agent_id: agentObjectId,
  });

  const queryBuilder = new QueryBuilder(baseQuery, query);
  const commissionQuery = queryBuilder
    .search(["type", "status"])
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta, totalAmount] = await Promise.all([
    commissionQuery.build(),
    queryBuilder.getMeta(),
    AgentCommissionHistoryModel.aggregate([
      { $match: { agent_id: agentObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  return {
    data,
    meta: {
      ...meta,
      totalCommissionAmount: totalAmount[0]?.total || 0,
    },
  };
};

const getAllCommission = async (query: Record<string, any>) => {
  const baseQuery = AgentCommissionHistoryModel.find({});
  const queryBuilder = new QueryBuilder(baseQuery, query);
  const commissionQuery = queryBuilder
    .search(["type", "status"])
    .filter()
    .sort()
    .fields()
    .paginate();
  const [data, meta] = await Promise.all([
    commissionQuery.build(),
    queryBuilder.getMeta(),
  ]);
  return {
    data,
    meta,
  };
};
export const CommissionService = {
  getAllCommission,
  getAllCommissionByUserID,
};
