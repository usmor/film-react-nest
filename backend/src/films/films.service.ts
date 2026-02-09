import { Inject, Injectable } from '@nestjs/common';
import { FilmDto } from './dto/films.dto';
import { FilmsRepository } from './repositories/films.repository.interface';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FilmsRepository')
    private readonly filmsRepository: FilmsRepository,
  ) {}

  create(data: Omit<FilmDto, 'id'>) {
    try {
      return this.filmsRepository.save(data);
    } catch (e) {
      throw new Error('Film already exists or failed to save the film');
    }
  }

  findById(id: string): Promise<FilmDto | undefined> {
    return this.filmsRepository.findById(id);
  }

  findAll(): Promise<FilmDto[]> {
    return this.filmsRepository.findAll();
  }

  findByIds(ids: string[]): Promise<FilmDto[]> {
    return this.filmsRepository.findByIds(ids);
  }

  update(id: string, data: Partial<Omit<FilmDto, 'id'>>): Promise<FilmDto> {
    try {
      return this.filmsRepository.update(id, data);
    } catch (e) {
      throw new Error(`Failed to update the film with ID ${id}`);
    }
  }

  delete(id: string): Promise<void> {
    try {
      return this.filmsRepository.delete(id);
    } catch (e) {
      throw new Error(`Failed to delete the film with ID ${id}`);
    }
  }
}
