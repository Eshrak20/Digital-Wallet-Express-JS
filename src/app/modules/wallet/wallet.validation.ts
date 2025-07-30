import { z } from "zod";

export const WalletAddBalanceZodSchema = z.object({
  user_id: z.string({ required_error: "User ID is required" }),
  amount: z.number().nonnegative().default(0),
});

