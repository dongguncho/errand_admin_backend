import express, {Router} from 'express'
import { UserController } from '../controllers/userController';

const router: Router = express.Router();
const userController = new UserController()

router.get('/', userController.findUser)

export default router