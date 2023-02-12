import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Mngr", { schema: "errand" })
export class Mngr {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "mngr_id",
    comment: "관리자",
  })
  mngrId: number;

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
    comment: "",
    length: 45,
  })
  name: string;

  @Column("varchar", {
    name: "password",
    comment: "",
    length: 45,
  })
  password: string;

  @Column("varchar", {
    name: "profile_img_no",
    comment: "",
    length: 45,
  })
  profileImgNo: string;

  @Column("varchar", {
    name: "birth",
    comment: "",
    length: 45,
  })
  birth: string;

  @Column("varchar", {
    name: "gender",
    comment: "",
    length: 45,
  })
  gender: string;

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
