import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";

@Entity("cupon", { schema: "errand" })
export class Cupon {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "cupon_id",
    comment: "유저아이디",
  })
  cuponId: number;

  @Column("varchar", {
    name: "use_tf",
    comment: "닉네임",
    length: 45,
  })
  useTf: string;

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
