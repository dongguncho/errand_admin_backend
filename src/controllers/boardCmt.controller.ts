import { NextFunction, Request, Response } from "express";
import { BoardCmtServie } from "../services/boardCmtService";

export class BoardCmtController {
  private boardCmntService: BoardCmtServie;
  constructor() {
    this.boardCmntService = new BoardCmtServie();
  }
  /**
   * 게시판 댓글 목록
   * @param req
   * @param res
   * @param next
   */
  public async findBoardCmtList(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const BoardCmtList = await this.boardCmntService.findBoardCmtList(req);
      res.status(200).json(BoardCmtList);
    } catch (error) {
      next(error);
    }
  }
  /**
   * 게시판 댓글
   * @param req
   * @param res
   * @param next
   */
  public async findBoardCmt(req: Request, res: Response, next: NextFunction) {
    try {
      const boardCmtInfo = await this.boardCmntService.findBoardCmt(req);
      res.status(200).json(boardCmtInfo);
    } catch (error) {
      next(error);
    }
  }
  /**
   * 게시판 댓글 등록
   * @param req
   * @param res
   * @param next
   */
  public async addBoardCmt(req: Request, res: Response, next: NextFunction) {
    try {
      const boardCmtInfo = await this.boardCmntService.addBoardCmt(req);
      res.status(200).json(boardCmtInfo);
    } catch (error) {
      next(error);
    }
  }
  /**
   * 게시판 댓글 수정
   * @param req
   * @param res
   * @param next
   */
  public async modifyBoardCmt(req: Request, res: Response, next: NextFunction) {
    try {
      const boardCmtInfo = await this.boardCmntService.modifyBoardCmt(req);
      res.status(200).json(boardCmtInfo);
    } catch (error) {
      next(error);
    }
  }
}
