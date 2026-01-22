import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Film } from '../../films/entities/film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'text', array: true, default: [] })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.id)
  @JoinColumn({ name: 'filmId' })
  film: Film;
}
