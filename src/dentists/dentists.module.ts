import { Module } from '@nestjs/common';
import { DentistsController } from './dentists.controller';
import { DentistsService } from './dentists.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DentistsEntity } from "./dentists.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DentistsEntity])],
  controllers: [DentistsController],
  providers: [DentistsService],
  exports: [DentistsService]
})
export class DentistsModule {}
