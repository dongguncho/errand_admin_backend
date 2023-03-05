import { Request } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../config/data-source";
import { BoardCmt } from "../entities/boardCmt.entity";

export class BoardCmtServie {
  private boardCmtRepository: Repository<BoardCmt>;
  constructor() {
    this.boardCmtRepository = appDataSource.getRepository(BoardCmt);
  }
  /**
   * 게시판 댓글 목록
   * @param req
   * @returns boardCmtList
   */
  public async findBoardCmtList(req: Request): Promise<BoardCmt[]> {
    const boardCmtList = await this.boardCmtRepository.find({});
    return boardCmtList;
  }
  /**
   * 게시판 댓글
   * @param req
   * @returns boardCmtInfo
   */
  public async findBoardCmt(req: Request): Promise<BoardCmt> {
    const { commentId } = req.params;
    const boardCmtInfo = await this.boardCmtRepository.findOne({
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
      boardCmt.regrNo = 1;
      boardCmt.modrNo = 1;
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
    const boardCmtInfo = await this.boardCmtRepository.findOne({
      where: { commentId: boardCmtDto.commentId },
    });
    await appDataSource.transaction(async (manager) => {
      const boardCmt = new BoardCmt();
      boardCmt.content = boardCmtDto.content;
      boardCmt.modrNo = 1;
      await this.boardCmtRepository.merge(boardCmtInfo, boardCmt);
      await manager.save(boardCmtInfo);
    });
  }
  /**
   * 게시판 댓글 삭제
   * @param req
   * @returns
   */
  public async removeBoardCmt(req: Request): Promise<string> {
    const commentId = req.params;
    await this.boardCmtRepository.delete(commentId);
    return "삭제 되었습니다.";
  }
}
