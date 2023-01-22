import express, {Router} from 'express'
import { UserController } from '../controllers/userController';
import { isAuthenticated } from "../passport/authenticate.passport";

const router: Router = express.Router();
const userController = new UserController()

router.get('/', isAuthenticated(), userController.findUser)
router.post('/', userController.login)
router.post('/regist', userController.addUser)
router.post('/modify', userController.modifyUser)

export default router