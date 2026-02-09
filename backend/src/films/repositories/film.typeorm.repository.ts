import { Film } from '../entities/film.entity';
import { FilmsRepository } from './films.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { FilmDto } from '../dto/films.dto';
import { Schedule } from '../../schedules/entities/schedule.entity';

export class FilmsTypeOrmRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async save(data: Omit<FilmDto, 'id'>): Promise<FilmDto> {
    const film = this.filmRepo.create(data);
    const saved = await this.filmRepo.save(film);
    return FilmDto.fromEntity(saved);
  }
  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmRepo.find({ relations: ['schedule'] });
    return films.map((f) => FilmDto.fromEntity(f));
  }
  async findById(id: string): Promise<FilmDto | undefined> {
    const film = await this.filmRepo.findOne({
      where: {
        id: id,
      },
      relations: ['schedule'],
    });
    return FilmDto.fromEntity(film);
  }

  async findByIds(ids: string[]): Promise<FilmDto[]> {
    const films = await this.filmRepo.find({
      where: { id: In(ids) },
      relations: ['schedule'],
    });
    return films.map((f) => FilmDto.fromEntity(f));
  }

  async update(
    id: string,
    data: Partial<Omit<FilmDto, 'id'>>,
  ): Promise<FilmDto> {
    if (data.schedule && data.schedule.length > 0) {
      for (const scheduleDto of data.schedule) {
        await this.scheduleRepo.update(scheduleDto.id, {
          taken: scheduleDto.taken ?? [],
        });
      }
    }

    const { schedule: _, ...filmData } = data;
    if (Object.keys(filmData).length > 0) {
      await this.filmRepo.update(id, filmData);
    }

    const updated = await this.findById(id);
    if (!updated) throw new Error('Film not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.filmRepo.delete(id);
  }
}
