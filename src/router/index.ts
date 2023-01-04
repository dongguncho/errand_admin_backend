import express, {Router} from 'express'
import userRouter from './userRouter'
const router: Router = express.Router();

router.use('/api', userRouter)

export default router