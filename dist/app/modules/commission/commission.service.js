"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommissionService = exports.TransferFee = exports.WithdrawCommission = void 0;
const capital_model_1 = require("../capital/capital.model");
const commission_model_1 = require("../commission/commission.model");
const WithdrawCommission = (agentId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const feeUnit = Math.floor(amount / 1000);
    const transactionFee = amount >= 1000 ? feeUnit * 20 : 10;
    const agentCommission = feeUnit * 10;
    const ownerCommission = transactionFee - agentCommission;
    if (agentId && agentCommission > 0) {
        yield commission_model_1.AgentCommissionHistoryModel.create({
            agent_id: agentId,
            amount: agentCommission,
        });
    }
    if (ownerCommission > 0) {
        yield capital_model_1.CapitalModel.findByIdAndUpdate("capital_wallet", { $inc: { balance: ownerCommission } }, { upsert: true, new: true });
    }
    return { transaction_fee: transactionFee };
});
exports.WithdrawCommission = WithdrawCommission;
const TransferFee = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionFee = amount <= 10000 ? 5 : 10;
    if (transactionFee > 0) {
        yield capital_model_1.CapitalModel.findByIdAndUpdate("capital_wallet", { $inc: { balance: transactionFee } }, { upsert: true, new: true });
    }
    return { transaction_fee: transactionFee };
});
exports.TransferFee = TransferFee;
const getAllCommissionByUserID = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield commission_model_1.AgentCommissionHistoryModel.find({ agent_id: user_id }).sort({
        createdAt: -1,
    });
    const totalCommission = yield commission_model_1.AgentCommissionHistoryModel.countDocuments({
        agent_id: user_id,
    });
    return {
        data: transactions,
        meta: {
            total: totalCommission,
        },
    };
});
const getAllCommission = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield commission_model_1.AgentCommissionHistoryModel.find({}).sort({
        createdAt: -1,
    });
    const totalTransaction = yield commission_model_1.AgentCommissionHistoryModel.countDocuments();
    return {
        data: transactions,
        meta: {
            total: totalTransaction,
        },
    };
});
exports.CommissionService = {
    getAllCommission,
    getAllCommissionByUserID,
};
