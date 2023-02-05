import { NextFunction, Request, Response } from "express";
import { BoardService } from "../services/boardService";

export class BoardController {
  private BoardService: BoardService;
  constructor() {
    this.BoardService = new BoardService();
  }

  /**
   * 게시판 목록 조회
   * @param req
   * @param res
   * @param next
   */
  public async findBoardList(req: Request, res: Response, next: NextFunction) {
    try {
      const findBoardList = await this.BoardService.findBoardList();
      res.status(200).json(findBoardList);
    } catch (error) {
      next(error);
    }
  }
  /**
   * 게시판 상세 조회
   * @param req
   * @param res
   * @param next
   */
  public async findBoardDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const findBoardDetail = await this.BoardService.findBoardDetail(req);
      res.status(200).json(findBoardDetail);
    } catch (error) {
      next(error);
    }
  }

  /**
   * 게시판 등록
   * @param req
   * @param res
   * @param next
   */
  public async addBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const addBoard = await this.BoardService.addBoard(req);
      res.status(200).json(addBoard);
    } catch (error) {
      next(error);
    }
  }
}
