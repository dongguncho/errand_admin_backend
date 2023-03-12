import express, { Router } from "express";
import { UserController } from "../controllers/userController";
import { isAuthenticated } from "../passport/authenticate.passport";

const router: Router = express.Router();
const userController = new UserController();
/**
 * 회원 라우트
 */
router.get("/", isAuthenticated(), userController.findUser);
router.post("/login", userController.login);
router.post("/", userController.addUser);
router.patch("/", isAuthenticated(), userController.modifyUser);
router.delete("/", isAuthenticated(), userController.removeUser);

export default router;
