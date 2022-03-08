import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DentistsEntity } from "../dentists/dentists.entity";

@Entity()
export class ReportsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column({ type: 'timestamptz' })
  from: Date;

  @Column({ type: 'timestamptz' })
  to: Date;

  @ManyToOne(() => DentistsEntity, dentist => dentist.reports)
  dentist: DentistsEntity
}