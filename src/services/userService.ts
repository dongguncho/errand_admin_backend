import { Request } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import jwt from 'jsonwebtoken';

export class userService {
    private userRepository: Repository<User>;
    private jwtSecretKey: string;
    constructor() {
        this.userRepository = appDataSource.getRepository(User)
        this.jwtSecretKey = process.env.JWT_SECRET;
    }

    public async findUserList(req:Request): Promise<User[]>{
        const { gender } = req.params
        const userList = await this.userRepository.find({})
        // const userList = await appDataSource.manager.find(User,{})
        return userList
    }
    public async login(req:Request): Promise<any>{
        const {userId, password} = req.body
        const userInfo = await this.userRepository.findOneBy({userId})
        if(userInfo.password === password){
            const token = jwt.sign({
                mbrNo: userInfo.userId,
                password: userInfo.password,
            }, this.jwtSecretKey);
            return {token}
        }
    }
}