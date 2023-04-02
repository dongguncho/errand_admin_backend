import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";

@Entity("user", { schema: "errand" })
export class User {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "user_id",
    comment: "유저아이디",
  })
  userId: number;

  @Column("varchar", {
    name: "nick_name",
    comment: "닉네임",
    length: 45,
  })
  nickName: string;

  @Column("varchar", {
    name: "email",
    comment: "이메일",
    length: 45,
  })
  email: string;

  @Column("varchar", {
    name: "name",
    comment: "이름",
    length: 45,
  })
  name: string;

  @Column("varchar", {
    name: "password",
    comment: "비밀번호",
    length: 45,
  })
  password: string;

  @Column("varchar", {
    name: "profile_img_no",
    comment: "프로필이미지번호",
    length: 45,
  })
  profileImgNo: string;

  @Column("varchar", {
    name: "birth",
    comment: "생년월일",
    length: 45,
  })
  birth: string;

  @Column("varchar", {
    name: "gender",
    comment: "성별",
    length: 45,
  })
  gender: string;

  @Column("bigint", {
    name: "regr_no",
    comment: "등록자번호",
  })
  regrNo: number;

  @Column("bigint", {
    name: "modr_no",
    comment: "수정자번호",
  })
  modrNo: number;

  @Column("datetime", {
    name: "reg_dt",
    comment: "등록일시",
    // default: () => "CURRENT_TIMESTAMP",
  })
  regDt: Date;

  @Column("datetime", {
    name: "mod_dt",
    comment: "수정일시",
    // default: () => "CURRENT_TIMESTAMP",
  })
  modDt: Date;
}
