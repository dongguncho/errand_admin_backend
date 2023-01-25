import { Request } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import jwt from 'jsonwebtoken';
import dayjs from "dayjs";
import logger from "../config/logger";
/**
 * 유저 서비스
 */
export class userService {
    private userRepository: Repository<User>;
    private jwtSecretKey: string;
    constructor() {
        this.userRepository = appDataSource.getRepository(User)
        this.jwtSecretKey = process.env.JWT_SECRET;
    }
    /**
     * 회원 정보 조회
     * @param req 
     * @returns 
     */

    public async findUserList(req:Request): Promise<User[]>{
        const { gender } = req.params
        try {
            const userList = await this.userRepository.find({})
            // const userList = await appDataSource.manager.find(User,{})
            return userList      
        } catch (error) {
            logger.info(error)
        }
    }
    /**
     * 로그인
     * @param req 
     * @returns 
     */
    public async login(req:Request): Promise<any>{
        const {userId, password} = req.body
        const userInfo = await this.userRepository.findOneBy({userId})
        try {
            if(userInfo.password === password){
                const token = jwt.sign({
                    mbrNo: userInfo.userId,
                    password: userInfo.password,
                }, this.jwtSecretKey);
                return {token}
            }else{
                return
            }
        } catch (error) {
            logger.info(error)
        }
    }
    
    /**
     * 회원 정보 수정
     * @param req 
     * @returns 
     */
    public async modifyUser(req: Request): Promise<User> {
        const userDto = req.body
        console.log(userDto)
        try {
            const userInfo = await this.userRepository.findOneBy({userId : userDto.userId})
            await appDataSource.transaction( async manager => {
                const user = new User()
                user.nickName = userDto.nickName
                //회원이미지 추가
    
                const modifyUser = await this.userRepository.merge(userInfo, user)
                await manager.save(modifyUser)
            })   
            return userInfo
        } catch (error) {
            logger.info(error)
        }
    }
    /**
     * 회원가입
     */
    public async addUser(req: Request): Promise<any> {
        const userDto = req.body
        try{
            await appDataSource.transaction( async manager => {
                const user = new User()
                user.birth = userDto.birth
                user.email = userDto.email
                user.gender = userDto.gender
                user.profileImgNo = userDto.profileImgNo
                user.name = userDto.name
                user.nickName = userDto.nickName
                user.password = userDto.password
                user.regDt = dayjs().toDate()
                user.modDt = dayjs().toDate()
                await manager.save(user)
            })
            return
        }catch(error){
            logger.info(error)
        }
    }
}