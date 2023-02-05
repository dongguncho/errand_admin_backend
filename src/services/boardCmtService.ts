import { Request } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../config/data-source";
import { BoardCmt } from "../entities/boardCmt.entity";

export class BoardCmtServie {
  private boardRepository: Repository<BoardCmt>;
  constructor() {
    this.boardRepository = appDataSource.getRepository(BoardCmt);
  }
  /**
   * 게시판 댓글 목록
   * @param req
   * @returns boardCmtList
   */
  public async findBoardCmtList(req: Request): Promise<BoardCmt[]> {
    const boardCmtList = await this.boardRepository.find({});
    return boardCmtList;
  }
  /**
   * 게시판 댓글
   * @param req
   * @returns boardCmtInfo
   */
  public async findBoardCmt(req: Request): Promise<BoardCmt> {
    const { commentId } = req.params;
    const boardCmtInfo = await this.boardRepository.findOne({
      where: { commentId: Number(commentId) },
    });
    return boardCmtInfo;
  }
  /**
   * 게시판 댓글 등록
   * @param req
   * @returns
   */
  public async addBoardCmt(req: Request): Promise<void> {
    const boardCmtDto = req.body;
    await appDataSource.transaction(async (manager) => {
      const boardCmt = new BoardCmt();
      boardCmt.content = boardCmtDto.content;
      await manager.save(boardCmt);
    });
  }
  /**
   * 게시판 댓글 수정
   * @param req
   * @returns
   */
  public async modifyBoardCmt(req: Request): Promise<void> {
    const boardCmtDto = req.body;
    const boardCmtInfo = await this.boardRepository.findOne({
      where: { commentId: boardCmtDto.commentId },
    });
    await appDataSource.transaction(async (manager) => {
      const boardCmt = new BoardCmt();
      boardCmt.content = boardCmtDto.content;
      await this.boardRepository.merge(boardCmtInfo, boardCmt);
      await manager.save(boardCmtInfo);
    });
  }
}
