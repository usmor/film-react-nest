import { FilmDto } from '../dto/films.dto';

export interface FilmsRepository {
  findAll(): Promise<FilmDto[]>;
  findById(id: string): Promise<FilmDto | undefined>;
  findByIds(ids: string[]): Promise<FilmDto[]>;
  save(film: Omit<FilmDto, 'id'>): Promise<FilmDto>;
  update(id: string, data: Partial<Omit<FilmDto, 'id'>>): Promise<FilmDto>;
  delete(id: string): Promise<void>;
}
