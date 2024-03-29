import express, { Router } from "express";
import { BoardController } from "../controllers/board.controller";
import { isAuthenticated } from "../passport/authenticate.passport";

const router: Router = express.Router();
const boardController = new BoardController();
/**
 * 게시판 라우트
 */
router.get("/", isAuthenticated(), boardController.findBoardList);
router.get("/:boardId", isAuthenticated(), boardController.findBoardDetail);
router.post("/", isAuthenticated(), boardController.addBoard);
router.patch("/", isAuthenticated(), boardController.modifyBoard);
router.delete("/:boardId", isAuthenticated(), boardController.removeBoard);

export default router;
