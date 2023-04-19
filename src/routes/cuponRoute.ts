import express, { Router } from "express";
import { CuponController } from "../controllers/cupon.controller";
import { isAuthenticated } from "../passport/authenticate.passport";

const router: Router = express.Router();
const cuponController = new CuponController();

router.get("/", isAuthenticated(), cuponController.findCupon);
router.post("/", isAuthenticated(), cuponController.addCupon);

export default router;
