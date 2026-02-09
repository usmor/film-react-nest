import { Model } from 'mongoose';
import { FilmsRepository } from './films.repository.interface';
import { FilmDto } from '../dto/films.dto';
import { Film } from '../schemas/film.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsMongoDbRepository implements FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async save(film: Omit<FilmDto, 'id'>): Promise<FilmDto> {
    const created = await this.filmModel.create(film);
    return FilmDto.fromEntity(created);
  }

  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmModel.find();
    return films.map((f) => FilmDto.fromEntity(f));
  }

  async findById(id: string): Promise<FilmDto | undefined> {
    const film = await this.filmModel.findOne({ id });
    if (!film) {
      return undefined;
    }
    return FilmDto.fromEntity(film);
  }

  async findByIds(ids: string[]): Promise<FilmDto[]> {
    const films = await this.filmModel.find({ id: { $in: ids } });
    return films.map((film) => FilmDto.fromEntity(film));
  }

  async update(
    id: string,
    data: Partial<Omit<FilmDto, 'id'>>,
  ): Promise<FilmDto> {
    const film = await this.filmModel.findOneAndUpdate({ id }, data, {
      new: true,
    });
    if (!film) throw new Error('Film not found');
    return FilmDto.fromEntity(film);
  }

  async delete(id: string): Promise<void> {
    await this.filmModel.deleteOne({ id });
  }
}
