import { NextFunction, Request, Response } from "express";
import { userService } from "../services/userService";

export class UserController {
    private UserService: userService
    constructor() {
        this.UserService = new userService();
    }

    public findUser = async (req: Request, res: Response, next: NextFunction) =>{
        const userList = await this.UserService.findUserList(req)
        res.status(200).json(userList)
    }
}