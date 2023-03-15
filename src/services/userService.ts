import { Request } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import logger from "../config/logger";
import { encode, decode } from "../utils/ciper.util";
/**
 * 유저 서비스
 */
export class userService {
  private userRepository: Repository<User>;
  private jwtSecretKey: string;
  constructor() {
    this.userRepository = appDataSource.getRepository(User);
    this.jwtSecretKey = process.env.JWT_SECRET;
  }
  /**
   * 회원 정보 조회
   * @param req
   * @returns
   */

  public async findUserList(req: Request): Promise<User[]> {
    const { userId } = req.params;

    const userList = await this.userRepository.find({
      where: { userId: Number(userId) },
    });
    // const userList = await appDataSource.manager.find(User,{})
    return userList;
  }
  /**
   * 로그인
   * @param req
   * @returns
   */
  public async login(req: Request): Promise<any> {
    const { email, password } = req.body;
    const userInfo = await this.userRepository.findOneBy({ email });

    if (decode(userInfo.password) === password) {
      const token = jwt.sign(
        {
          userId: userInfo.userId,
          email: userInfo.email,
          password: userInfo.password,
        },
        this.jwtSecretKey
      );
      return { token };
    } else {
      return;
    }
  }

  /**
   * 회원 정보 수정
   * @param req
   * @returns
   */
  public async modifyUser(req: Request): Promise<User> {
    const userDto = req.body;
    const userInfo = await this.userRepository.findOneBy({
      userId: userDto.userId,
    });
    await appDataSource.transaction(async (manager) => {
      const user = new User();
      user.nickName = userDto.nickName;
      //회원이미지 추가

      const modifyUser = await this.userRepository.merge(userInfo, user);
      await manager.save(modifyUser);
    });
    return userInfo;
  }
  /**
   * 회원가입
   */
  public async addUser(req: Request): Promise<any> {
    const userDto = req.body;
    await appDataSource.transaction(async (manager) => {
      const user = new User();
      user.nickName = userDto.nickName;
      user.email = userDto.email;
      user.name = userDto.name;
      user.password = encode(userDto.password);
      user.birth = encode(userDto.birth);
      user.profileImgNo = userDto.profileImgNo;
      user.gender = userDto.gender;
      user.regDt = dayjs().toDate();
      user.modDt = dayjs().toDate();
      await manager.save(user);
    });
    return "등록되었습니다";
  }
  /**
   * 회원탈퇴
   */

  public async removeUser(req: Request): Promise<any> {
    const userId = req.params;
    await this.userRepository.delete(userId);
    return "삭제되었습니다";
  }
}
