import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { WalletAddBalanceZodSchema } from "./wallet.validation";
import { WalletControllers } from "./wallet.controller";

const router = Router();
router.post(
  "/add",
  validateRequest(WalletAddBalanceZodSchema),
  WalletControllers.addMoney
);


export const WalletRoutes = router;
