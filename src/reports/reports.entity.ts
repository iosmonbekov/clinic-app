import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DentistsEntity } from "../dentists/dentists.entity";

@Entity()
export class ReportsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column({type: "timestamp", })
  from: Date;

  @Column({type: "timestamp", })
  to: Date;

  @ManyToOne(() => DentistsEntity, dentist => dentist.reports)
  dentist: DentistsEntity;
}