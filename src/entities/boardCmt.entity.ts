import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Board } from "./board.entity";

@Entity()
export class BoardCmt {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "comment_id",
    comment: "게시판댓글아이디",
  })
  commentId: number;

  //   @Column("bigint", {
  //     name: "board_id",
  //     comment: "게시판아이디",
  //   })
  //   boardId: number;

  @Column("text", {
    name: "content",
    comment: "댓글내용",
  })
  content: string;

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

  @ManyToOne((type) => Board, (board) => board.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  board: Board;
}
