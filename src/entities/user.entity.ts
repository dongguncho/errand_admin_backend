import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("user", {schema:"errand"})
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
