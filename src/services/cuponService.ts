import { Request } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../config/data-source";
import { Cupon } from "../entities/cupon.entity";

export class cuponService {
  private cuponRepository: Repository<Cupon>;
  constructor() {
    this.cuponRepository = appDataSource.getRepository(Cupon);
  }
  /**
   * 쿠폰조회 서비스
   * @param req
   * @returns
   */
  public async findCuponList(req: Request): Promise<Cupon[]> {
    const cuponList = await this.cuponRepository.find({});
    return cuponList;
  }
  /**
   * 쿠폰등록 서비스
   * @param req
   * @returns
   */
  public async addCupon(req: Request): Promise<any> {
    const cupunData = req.body;
    await appDataSource.transaction(async (manager) => {
      const cupon = new Cupon();
      cupon.useTf = "Y";
      cupon.regrNo = 0;
      cupon.modrNo = 0;

      await manager.save(cupon);
    });
    return "등록되었습니다";
  }
  /**
   * 쿠폰수정 서비스
   * @param req
   * @returns
   */
  public async modifyCupon(req: Request): Promise<any> {
    const cupunData = req.body;
    const cuponInfo = await this.cuponRepository.findOne({
      where: { cuponId: cupunData.cuponId },
    });
    await appDataSource.transaction(async (manager) => {
      const cupon = new Cupon();
      cupon.useTf = "Y";
      cupon.regrNo = 0;
      cupon.modrNo = 0;
      const cuponMerge = this.cuponRepository.merge(cupon, cuponInfo);
      await manager.save(cuponMerge);
      return "수정되었습니다";
    });
    return true;
  }
  /**
   * 쿠폰삭제 서비스
   * @param req
   * @returns
   */
  public async deleteCupon(req: Request): Promise<any> {
    const cuponId = req.params;
    const cuponInfo = await this.cuponRepository.findOne({
      where: { cuponId: Number(cuponId) },
    });
    await this.cuponRepository.delete(cuponInfo.cuponId);
    return "삭제되었습니다";
  }
}
