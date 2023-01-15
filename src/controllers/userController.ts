import { NextFunction, Request, Response } from "express";
import { userService } from "../services/userService";
import {join} from 'path'
export class UserController {
    private UserService: userService
    constructor() {
        this.UserService = new userService();
    }

    public findUser = async (req: Request, res: Response, next: NextFunction) =>{
        const userList = await this.UserService.findUserList(req)
        res.status(200).json(userList)
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const loginInfo = await this.UserService.login(req)
        res.status(200).json(loginInfo)
    }
}