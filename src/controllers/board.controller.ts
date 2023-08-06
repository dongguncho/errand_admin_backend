import { NextFunction, Request, Response } from "express";
import { StatusEnum } from "../middlewares/HttpException";
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
      res.status(StatusEnum.OK).json(findBoardList);
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
      res.status(StatusEnum.OK).json(findBoardDetail);
    } catch (error) {
      next(error);
    }
  }
//
  /**
   * 게시판 등록
   * @param req
   * @param res
   * @param next
   */
  public async addBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const addBoard = await this.BoardService.addBoard(req);
      res.status(StatusEnum.OK_INSERT).json(addBoard);
    } catch (error) {
      next(error);
    }
  }

  /**
   * 게시판 수정
   * @param req
   * @param res
   * @param next
   */
  public async modifyBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const modifyBoard = await this.BoardService.modifyBoard(req);
      res.status(StatusEnum.OK_MODIFY).json(modifyBoard);
    } catch (error) {
      next(error);
    }
  }
  /**
   * 게시판 삭제
   * @param req
   * @param res
   * @param next
   */
  public async removeBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const removeBoard = await this.BoardService.removeBoard(req);
      res.status(StatusEnum.OK_DELETE).json(removeBoard);
    } catch (error) {
      next(error);
    }
  }
}
