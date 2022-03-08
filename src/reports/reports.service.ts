import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ReportsEntity } from "./reports.entity";
import { Repository } from "typeorm";
import { ReportDto } from "./dto/report.dto";
import { DentistsEntity } from "../dentists/dentists.entity";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(ReportsEntity) private reportsRepository: Repository<ReportsEntity>,
              private dentistsService: DentistsEntity) {}

  getAllReports():Promise<ReportsEntity[]> {
    return this.reportsRepository.find({relations: ['dentist']});
  }
  getAllActiveReports() {}
  getReportsByDentistId() {}
  createReport(reportDto: ReportDto) {
    const report = this.reportsRepository.create(reportDto);
    console.log(report);
    return this.reportsRepository.save(reportDto);
  }
  editReport() {}
  deleteReport() {}
}
