import { DataSource } from "typeorm"
import { join } from 'path'
import logger from "./logger"
import { WinstonAdaptor } from 'typeorm-logger-adaptor/logger/winston'

export const appDataSource = new DataSource ({
 type: 'mysql',
 host: process.env.DATABASE_HOST,
 port: Number(process.env.DATABASE_PORT),
 username: process.env.DATABASE_USERNAME,
 password: process.env.DATABASE_PASSWORD,
 database: process.env.DATABASE_NAME,
 synchronize: Boolean(process.env.DATA_BASE_SYNCHRONIZE),
 entities: [join(__dirname + '/../entities/*.entity.ts')],
//  logger: new WinstonAdaptor(logger, ["query"], true),
 subscribers: [],
 migrations: []
})
appDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
        logger.info('database success cunnection')
    })
    .catch((error) => logger.info(error))