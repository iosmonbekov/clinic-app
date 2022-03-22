import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportsEntity } from "./reports.entity";
import { Repository } from "typeorm";
import { ReportDto } from "./dto/report.dto";
import { DentistsService } from "../dentists/dentists.service";

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(ReportsEntity) private reportsRepository: Repository<ReportsEntity>,
              private dentistsService: DentistsService) {}

  getAllReports():Promise<ReportsEntity[]> {
    return this.reportsRepository.find({relations: ['dentist']});
  }
  getAllActiveReports() {}
  getReportsByDentistId() {}
  async createReport(reportDto: ReportDto):Promise<ReportsEntity> {
    const isDoctorFree = await this.validateDates(reportDto);
    if (isDoctorFree) {
      const dentist = await this.dentistsService.getDentistById(reportDto.dentistId);
      const report = this.reportsRepository.create({ ...reportDto, dentist });
      return this.reportsRepository.save(report);
    }
    throw new HttpException('Doctor have patient at this period', HttpStatus.BAD_REQUEST);
  }

  async validateDates({from, to}: ReportDto):Promise<boolean> {
    const fromHour = new Date(from).getHours();
    const toHour = new Date(to).getHours();

    const fromDay = new Date(from).getDay();
    const toDay = new Date(to).getDay();



    if (fromHour > 12 && fromHour < 13 || toHour > 12 && toHour < 13) {
      throw new HttpException('Lunch time between 12 - 13', HttpStatus.BAD_REQUEST);
    }

    if (fromDay > 5 || toDay > 5) {
      throw new HttpException('Dentists don\' work on weekends', HttpStatus.BAD_REQUEST);
    }

    if (fromHour < 9 || fromHour > 17 || toHour < 9 || toHour > 17) {
      console.log(fromHour, toHour)
      throw new HttpException('Dentist works on period of 09:00 - 17:00', HttpStatus.BAD_REQUEST);
    }

    const reports: ReportsEntity[] = await this.reportsRepository.query(
      `SELECT * FROM reports_entity 
             WHERE reports_entity.from < '${from}' AND reports_entity.to > '${from}' 
             OR reports_entity.from < '${to}' AND reports_entity.to > '${to}'`);
    if (reports.length) return false;
    return true;
  }
}
