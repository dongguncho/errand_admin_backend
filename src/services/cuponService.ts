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
}
