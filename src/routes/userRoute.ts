import express, { Router } from "express";
import { UserController } from "../controllers/userController";
import { isAuthenticated } from "../passport/authenticate.passport";

const router: Router = express.Router();
const userController = new UserController();
/**
 * 회원 라우트
 */
router.get("/:userId", isAuthenticated(), userController.findUser);
router.post("/login", userController.login);
router.post("/", userController.addUser);
<<<<<<< HEAD
router.patch("/modify", isAuthenticated(), userController.modifyUser);
router.delete("/:userId", isAuthenticated(), userController.removeUser);
=======
router.patch("/", isAuthenticated(), userController.modifyUser);
router.delete("/", isAuthenticated(), userController.removeUser);
>>>>>>> 0ffe0514f7bfd9dc3664da37b244051f4981ede5

export default router;
