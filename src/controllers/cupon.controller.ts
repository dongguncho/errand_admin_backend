import { NextFunction, Request, Response } from "express";
import { StatusEnum } from "../middlewares/HttpException";
import { cuponService } from "../services/cuponService";

export class cuponController {
  private cuponService: cuponService;
  constructor() {
    this.cuponService = new cuponService();
  }

  public findCupon = async (
    res: Response,
    req: Request,
    next: NextFunction
  ) => {
    try {
      const cuponList = this.cuponService.findCuponList(req);
      res.status(200).json(cuponList);
    } catch (error) {
      next(error);
    }
  };
}
