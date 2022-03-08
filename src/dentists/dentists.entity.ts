import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReportsEntity } from "../reports/reports.entity";

@Entity()
export class DentistsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ReportsEntity, report => report.dentist)
  reports: ReportsEntity[]
}