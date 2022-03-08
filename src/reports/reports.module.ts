import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsEntity } from "./reports.entity";
import { DentistsModule } from "../dentists/dentists.module";

@Module({
  imports: [TypeOrmModule.forFeature([ReportsEntity]), DentistsModule],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
