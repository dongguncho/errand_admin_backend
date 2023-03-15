import { NextFunction, Request, Response } from "express";
import { StatusEnum } from "../middlewares/HttpException";
import { userService } from "../services/userService";
/**
 * 유저 컨트롤러
 */
export class UserController {
  private UserService: userService;
  constructor() {
    this.UserService = new userService();
  }
  /**
   * 회원 조회
   * @param req
   * @param res
   * @param next
   */
  public findUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userList = await this.UserService.findUserList(req);
      res.status(StatusEnum.OK).json(userList);
    } catch (error) {
      next(error);
    }
  };
  /**
   * 로그인
   * @param req
   * @param res
   * @param next
   */
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginInfo = await this.UserService.login(req);
      res.status(StatusEnum.OK).json(loginInfo);
    } catch (error) {
      next(error);
    }
  };

  /**
   * 회원 정보 수정
   * @param req
   * @param res
   * @param next
   */
  public modifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userInfo = await this.UserService.modifyUser(req);
      res.status(StatusEnum.OK_MODIFY).json(userInfo);
    } catch (error) {
      next(error);
    }
  };

  /**
   * 회원가입
   * @param req
   * @param res
   * @param next
   */
  public addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addUser = await this.UserService.addUser(req);
      res.status(StatusEnum.OK_INSERT).json(addUser);
    } catch (error) {
      next(error);
    }
  };
  /**
   * 회원탈퇴
   */
  public removeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const removeUser = await this.UserService.removeUser(req);
      res.status(StatusEnum.OK_DELETE).json(removeUser);
    } catch (error) {
      next(error);
    }
  };
}
