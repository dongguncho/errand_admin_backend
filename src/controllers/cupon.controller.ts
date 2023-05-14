import { NextFunction, Request, Response } from "express";
import { StatusEnum } from "../middlewares/HttpException";
import { cuponService } from "../services/cuponService";

export class CuponController {
  private cuponService: cuponService;
  constructor() {
    this.cuponService = new cuponService();
  }
  /**
   * 쿠폰 조회
   * @param req
   * @param res
   * @param next
   */

  public findCupon = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const cupondata = await this.cuponService.findCuponList(req);
      res.status(200).json(cupondata);
    } catch (error) {
      next(error);
    }
  };
  /**
   * 쿠폰 등록
   * @param req
   * @param res
   * @param next
   */
  public addCupon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cupondata = await this.cuponService.addCupon(req);
      res.status(200).json(cupondata);
    } catch (error) {
      next(error);
    }
  };
  /**
   * 쿠폰 수정
   * @param req
   * @param res
   * @param next
   */
  public modifyCupon = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const cupondata = await this.cuponService.modifyCupon(req);
      res.status(200).json(cupondata);
    } catch (error) {
      next(error);
    }
  };
  /**
   * 쿠폰 삭제
   * @param req
   * @param res
   * @param next
   */
  public deleteCupon = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const cupondata = await this.cuponService.deleteCupon(req);
      res.status(200).json(cupondata);
    } catch (error) {
      next(error);
    }
  };
}
