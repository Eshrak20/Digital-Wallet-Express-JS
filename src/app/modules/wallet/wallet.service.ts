import AppError from "../../errorHelpers/AppError";
import { TransactionService } from "../transaction/transaction.service";
import { WalletModel } from "../wallet/wallet.model";

const addMoney = async (user_id: string, amount: number) => {
  if (amount <= 0) throw new AppError(400, "Invalid amount");

  const wallet = await WalletModel.findOne({ user: user_id });

  if (!wallet) throw new AppError(404, "Wallet not found");
  if (wallet.status === "BLOCKED") throw new AppError(403, "Wallet is blocked");

  wallet.balance += amount;
  await wallet.save();

  await TransactionService.createTransaction({
    user_id: user_id,
    type: "add",
    amount,
    status: "completed",
  });

  return wallet;
};

export const WalletService = {
  addMoney,
};
