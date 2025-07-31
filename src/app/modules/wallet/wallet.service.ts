import AppError from "../../errorHelpers/AppError";
import {
  TransactionStatus,
  TransactionType,
} from "../transaction/transaction.interface";
import { TransactionService } from "../transaction/transaction.service";
import { WalletModel } from "../wallet/wallet.model";
import { IWallet } from "./wallet.interface";

const getAllWallet = async () => {
  const transactions = await WalletModel.find({});
  const totalTransaction = await WalletModel.countDocuments();
  return {
    data: transactions,
    meta: {
      total: totalTransaction,
    },
  };
};

const addMoney = async (user_id: string, amount: number) => {
  if (amount <= 0) throw new AppError(400, "Invalid amount");

  const wallet = await WalletModel.findOne({ user: user_id });

  if (!wallet) throw new AppError(404, "Wallet not found");
  if (wallet.status === "BLOCKED") throw new AppError(403, "Wallet is blocked");

  wallet.balance += amount;
  await wallet.save();

  await TransactionService.createTransaction({
    user: user_id,
    amount,
    type: TransactionType.ADD,
    status: TransactionStatus.COMPLETED,
  });

  return wallet;
};
const withdrawMoney = async (user_id: string, amount: number) => {
  if (amount <= 0) throw new AppError(400, "Invalid amount");

  const wallet = await WalletModel.findOne({ user: user_id });

  if (!wallet) throw new AppError(404, "Wallet not found");
  if (wallet.status === "BLOCKED") throw new AppError(403, "Wallet is blocked");

  wallet.balance -= amount;
  await wallet.save();

  await TransactionService.createTransaction({
    user: user_id,
    amount,
    type: TransactionType.WITHDRAW,
    status: TransactionStatus.COMPLETED,
  });

  return wallet;
};

const transferMoney = async (
  sender_id: string,
  receiver_id: string,
  amount: number
) => {
  if (amount <= 0) throw new AppError(400, "Invalid amount");

  const senderWallet = await WalletModel.findOne({ user: sender_id });
  const receiverWallet = await WalletModel.findOne({ user: receiver_id });

  if (!senderWallet || !receiverWallet)
    throw new AppError(404, "Wallet not found");
  if (senderWallet.status === "BLOCKED" || receiverWallet.status === "BLOCKED")
    throw new AppError(403, "Wallet is blocked");

  if (senderWallet.balance < amount) {
    throw new AppError(422, "Insufficient Balance");
  }

  senderWallet.balance -= amount;
  receiverWallet.balance += amount;
  await senderWallet.save();
  await receiverWallet.save();

  await TransactionService.createTransaction({
    user: sender_id,
    amount,
    type: TransactionType.TRANSFER,
    status: TransactionStatus.COMPLETED,
  });

  return {
    receiverWallet,
    senderWallet,
  };
};

const updateWallet = async (userId: string, payload: Partial<IWallet>) => {
  const wallet = await WalletModel.findOne({ user: userId });

  if (!wallet) throw new AppError(404, "Wallet not found");
  if (wallet.status === "BLOCKED") throw new AppError(403, "Wallet is blocked");

  const updatedWallet = await WalletModel.findOneAndUpdate(
    { user: userId }, // filter
    payload, // update
    {
      new: true, // return the updated document
      runValidators: true,
    }
  );

  return updatedWallet;
};

export const WalletService = {
  addMoney,
  getAllWallet,
  withdrawMoney,
  transferMoney,
  updateWallet,
};
