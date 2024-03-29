import dayjs from "dayjs";
import { Request } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../config/data-source";
import { Board } from "../entities/board.entity";
/**
 * 게시판 서비스
 */
export class BoardService {
  private boardRepository: Repository<Board>;
  constructor() {
    this.boardRepository = appDataSource.getRepository(Board);
  }
  /**
   * 게시판 목록 조회
   * @returns findBoardList
   */
  public async findBoardList(): Promise<Board[]> {
    const findBoardList = await this.boardRepository.find();
    return findBoardList;
  }

  /**
   * 게시판 상세 조회
   * @param req
   * @returns findBoardDetail
   */
  public async findBoardDetail(req: Request): Promise<Board> {
    const boardId = req.params;
    const findBoardDetail = await this.boardRepository.findOneBy({
      boardId: Number(boardId),
    });
    return findBoardDetail;
  }
  /**
   * 게시판 등록
   * @param req
   * @returns
   */

  public async addBoard(req: Request): Promise<String> {
    const user = req.user;
    console.log(user);
    const boardDto = req.body;
    await appDataSource.transaction(async (manager) => {
      const board = new Board();
      board.title = boardDto.title;
      board.content = boardDto.content;
      board.atchFileNo = boardDto.atchFileNo;
      board.regrNo = 0;
      board.modrNo = 0;
      await manager.save(board);
    });
    return "등록 성공했습니다.";
  }
  /**
   * 게시판 수정
   * @param req
   */
  public async modifyBoard(req: Request): Promise<String> {
    const boardDto = req.body;
    const boardInfo = await this.boardRepository.findOne({
      where: { boardId: boardDto.boardId },
    });
    await appDataSource.manager.transaction(async (manager) => {
      const board = new Board();
      board.title = boardDto.title;
      board.content = boardDto.content;
      board.atchFileNo = boardDto.atchFileNo;
      board.modrNo = 0;
      board.modDt = dayjs().toDate();
      const modifyBoard = await this.boardRepository.merge(boardInfo, board);
      await manager.save(modifyBoard);
    });
    return "수정 성공하였습니다.";
  }
  /**
   * 게시판 삭제
   */

  public async removeBoard(req: Request): Promise<String> {
    const boardId = req.params;
    await this.boardRepository.delete(boardId);
    return "삭제되었습니다";
  }
}
