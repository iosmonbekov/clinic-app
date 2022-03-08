import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DentistsModule } from './dentists/dentists.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'clinic',
      entities: [],
      synchronize: true,
    }),
    DentistsModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
