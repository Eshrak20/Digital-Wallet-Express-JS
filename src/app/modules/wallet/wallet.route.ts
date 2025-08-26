import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { WalletControllers } from "./wallet.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import {
  WalletAddMoneyZodSchema,
  WalletBalanceAddZodSchema,
  WalletBalanceWithdrawZodSchema,
  WalletTransferZodSchema,
} from "./wallet.validation";

const router = Router();

router.get(
  "/all-wallet",
  checkAuth(Role.ADMIN),
  WalletControllers.getAllWallet
);
router.get(
  "/my-wallet",
  checkAuth(Role.USER, Role.AGENT),
  WalletControllers.getMylWallet
);
router.get(
  "/capital-wallet",
  checkAuth(Role.ADMIN),
  WalletControllers.getCapitalWallet
);
router.post(
  "/add",
  validateRequest(WalletBalanceAddZodSchema),
  checkAuth(Role.AGENT),
  WalletControllers.addMoney
);
router.post(
  "/withdraw",
  validateRequest(WalletBalanceWithdrawZodSchema),
  checkAuth(Role.USER),
  WalletControllers.withdrawMoney
);
router.post(
  "/transfer-money",
  validateRequest(WalletTransferZodSchema),
  checkAuth(Role.USER),
  WalletControllers.transferMoney
);
router.patch(
  "/:id",
  validateRequest(WalletAddMoneyZodSchema),
  checkAuth(Role.ADMIN),
  WalletControllers.updateWallet
);

export const WalletRoutes = router;
