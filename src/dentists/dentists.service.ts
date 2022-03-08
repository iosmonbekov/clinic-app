import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DentistsEntity } from "./dentists.entity";
import { Repository } from "typeorm";

@Injectable()
export class DentistsService {
  constructor(@InjectRepository(DentistsEntity) private dentistRepository: Repository<DentistsEntity>) {}

  getDentistById(id: number):Promise<DentistsEntity> {
    return this.dentistRepository.findOne(id);
  }
}
