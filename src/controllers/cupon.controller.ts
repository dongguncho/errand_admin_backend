import { NextFunction, Request, Response } from "express";
import { StatusEnum } from "../middlewares/HttpException";
import { cuponService } from "../services/cuponService";

export class CuponController {
  private cuponService: cuponService;
  constructor() {
    this.cuponService = new cuponService();
  }

  public findCupon = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const cuponList = await this.cuponService.findCuponList(req);
      res.status(200).json(cuponList);
    } catch (error) {
      next(error);
    }
  };
}
