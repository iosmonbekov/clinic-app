import { Body, Controller, Get, Post } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportDto } from "./dto/report.dto";
import { ReportsEntity } from "./reports.entity";

@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService) {}

  @Get()
  getAllReports():Promise<ReportsEntity[]> {
    return this.reportsService.getAllReports();
  }

  @Post()
  createReport(@Body() reportDto: ReportDto) {
    return this.reportsService.createReport(reportDto);
  }
}
