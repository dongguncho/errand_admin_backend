import { NextFunction, Request, Response } from "express";
import { userService } from "../services/userService";
/**
 * 유저 컨트롤러
 */
export class UserController {
    private UserService: userService
    constructor() {
        this.UserService = new userService();
    }
    /**
     * 회원 조회
     * @param req 
     * @param res 
     * @param next 
     */
    
    public findUser = async (req: Request, res: Response, next: NextFunction) =>{
        const userList = await this.UserService.findUserList(req)
        res.status(200).json(userList)
    }
    /**
     * 로그인
     * @param req 
     * @param res 
     * @param next 
     */

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const loginInfo = await this.UserService.login(req)
        res.status(200).json(loginInfo)
    }
    /**
     * 회원 정보 수정
     * @param req 
     * @param res 
     * @param next 
     */

    public modifyUser = async (req: Request, res: Response, next: NextFunction) => {
        const userInfo = await this.UserService.modifyUser(req)
        res.status(200).json(userInfo)
    }
    /**
     * 회원가입
     * @param req 
     * @param res 
     * @param next 
     */

    public addUser = async   (req: Request, res: Response, next: NextFunction) => {
        const addUser = await this.UserService.addUser(req)
        res.status(200).json(addUser)
    }
}