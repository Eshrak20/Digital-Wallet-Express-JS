import { z } from "zod";

export const WalletBalanceZodSchema = z.object({
  amount: z.number().nonnegative().default(0),
});
export const WalletTransferZodSchema = z.object({
  receiver_id: z.string({ required_error: "User ID is required" }),
  amount: z.number().nonnegative().default(0),
});

