import { CapitalModel } from "../capital/capital.model";
import { AgentCommissionHistoryModel } from "../commission/commission.model";
export const WithdrawCommission = async (
  agentId: string,
  amount: number
) => {
  const feeUnit = Math.floor(amount / 1000);
  const transactionFee = amount >= 1000 ? feeUnit * 20 : 10;

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

  return { transaction_fee: transactionFee };
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

const getAllCommissionByUserID = async (user_id: string) => {
  const transactions = await AgentCommissionHistoryModel.find({
    user: user_id,
  }).sort({
    createdAt: -1,
  });
  const totalTransaction = await AgentCommissionHistoryModel.countDocuments();
  return {
    data: transactions,
    meta: {
      total: totalTransaction,
    },
  };
};
const getAllCommission = async () => {
  const transactions = await AgentCommissionHistoryModel.find({});
  const totalTransaction = await AgentCommissionHistoryModel.countDocuments();
  return {
    data: transactions,
    meta: {
      total: totalTransaction,
    },
  };
};
export const CommissionService = {
  getAllCommission,
  getAllCommissionByUserID,
};
