import {DataSource} from "typeorm"
import {join} from 'path'
import { User } from "../entities/user.entity"


export const appDataSource = new DataSource ({
 type: 'mysql',
 host: process.env.DATABASE_HOST,
 port: Number(process.env.DATABASE_PORT),
 username: process.env.DATABASE_USERNAME,
 password: process.env.DATABASE_PASSWORD,
 database: process.env.DATABASE_NAME,
 synchronize: Boolean(process.env.DATA_BASE_SYNCHRONIZE),
 entities: [join(__dirname, "../entities/*.entity(.ts,.js)")],
 subscribers: [],
 migrations: []
})