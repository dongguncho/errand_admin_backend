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

  @Column("text", {
    name: "content",
    comment: "댓글내용",
  })
  content: string;

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
