import { Request } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";

export class userService {
    private userRepository: Repository<User>;
    constructor() {
        this.userRepository = appDataSource.getRepository(User)
    }

    public async findUserList(req:Request): Promise<User[]>{
        const { gender } = req.params
        const userList = await this.userRepository.find({})
        return userList
    }
}