import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserRoleAndStatusZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
router.get(
  "/my-profile",
  checkAuth(...Object.values(Role)),
  UserControllers.myProfile
);
router.get("/all-users", checkAuth(Role.ADMIN,Role.USER), UserControllers.getAllUsers);
router.get("/all-agents", checkAuth(Role.ADMIN), UserControllers.getAllAgents);
router.patch("/update-profile", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateProfile);
router.patch("/:id", validateRequest(updateUserRoleAndStatusZodSchema), checkAuth(Role.ADMIN), UserControllers.updateUserRoleAndStatus);

export const UserRoutes = router;
