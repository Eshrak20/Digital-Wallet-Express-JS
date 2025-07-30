import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { transactionControllers } from "./transaction.controller";
import { Role } from "../user/user.interface";

const router = Router();
router.get(
  "/all-transaction",
  checkAuth(Role.ADMIN),
  transactionControllers.getAllTransaction
);

export const WalletRoutes = router;
