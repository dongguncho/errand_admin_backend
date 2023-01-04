import express, {Router} from 'express'
import selectUser from '../api/user'

const router: Router = express.Router();

router.get('/user', selectUser)

export default router