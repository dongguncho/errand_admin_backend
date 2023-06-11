import express, { Router } from "express";
import { BoardCmtController } from "../controllers/boardCmt.controller";
import { isAuthenticated } from "../passport/authenticate.passport";

const router: Router = express.Router();
const boardCmtController = new BoardCmtController();
/**
 * 댓글 라우트
 */
router.get("/", isAuthenticated(), boardCmtController.findBoardCmtList);
router.get("/:commentId", isAuthenticated(), boardCmtController.findBoardCmt);
router.post("/", isAuthenticated(), boardCmtController.addBoardCmt);
router.patch(
  "/:commentId",
  isAuthenticated(),
  boardCmtController.modifyBoardCmt
);
// 점코밋
router.delete(
  "/:commentId",
  isAuthenticated(),
  boardCmtController.removeBoardCmt
);

export default router;
