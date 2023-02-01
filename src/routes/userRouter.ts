import express, { Router } from "express";
import { UserController } from "../controllers/userController";
import { isAuthenticated } from "../passport/authenticate.passport";

const router: Router = express.Router();
const userController = new UserController();

router.get("/", isAuthenticated(), userController.findUser);
router.post("/login", userController.login);
router.post("/", userController.addUser);
router.patch("/modify", isAuthenticated(), userController.modifyUser);

export default router;
