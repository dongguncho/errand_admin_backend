import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class errandType {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "type_id",
    comment: "심부름종류번호",
  })
  typeId: number;

  @Column("varchar", {
    name: "errand_name",
    comment: "심부름명",
    length: 45,
  })
  errandName: string;

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
