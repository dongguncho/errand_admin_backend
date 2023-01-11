import express, {Router} from 'express'
import userRouter from './userRouter'

export default (app: express.Application) => {
    app.use("/api/auth", userRouter)
}


