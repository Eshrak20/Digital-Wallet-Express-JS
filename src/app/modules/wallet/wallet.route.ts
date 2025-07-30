import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { WalletAddBalanceZodSchema } from "./wallet.validation";
import { WalletControllers } from "./wallet.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();
router.post(
  "/add",
  validateRequest(WalletAddBalanceZodSchema),
  checkAuth(Role.AGENT,Role.USER),
  WalletControllers.addMoney
);

export const WalletRoutes = router;
