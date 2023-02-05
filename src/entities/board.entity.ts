import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BoardCmt } from "./boardCmt.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "board_id",
    comment: "게시판아이디",
  })
  boardId: number;

  @Column({ length: 100 })
  title: string;

  @Column("text")
  content: string;

  @Column("bigint", {
    name: "atch_file_no",
    nullable: true,
    comment: "첨부파일번호",
  })
  atchFileNo: number;

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
  })
  regDt: Date;

  @Column("datetime", {
    name: "mod_dt",
    comment: "수정일시",
  })
  modDt: Date;

  @OneToMany((type) => BoardCmt, (boardCmt) => boardCmt.board)
  comments: Comment[];
}
