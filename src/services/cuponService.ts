import { Request } from "express";
import { Repository } from "typeorm";
import { appDataSource } from "../config/data-source";
import { Cupon } from "../entities/cupon.entity";

export class cuponService {
  private cuponRepository: Repository<Cupon>;
  constructor() {
    this.cuponRepository = appDataSource.getRepository(Cupon);
  }

  public async findCuponList(req: Request): Promise<Cupon[]> {
    const cuponList = await this.cuponRepository.find({});
    return cuponList;
  }
  public async addCupon(req: Request): Promise<any> {
    const cupunData = req.body;
    await appDataSource.transaction(async (manager) => {
      const cupon = new Cupon();
      cupon.useTf = "Y";
      cupon.regrNo = 0;
      cupon.modrNo = 0;

      await manager.save(cupon);
    });
    return true;
  }
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
    });
    return true;
  }
}
