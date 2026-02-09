import { Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  IsNumber,
  ArrayNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ScheduleDto } from '../../schedules/dto/schedule.dto';

export class FilmDto {
  @IsUUID()
  id: string;

  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  cover: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedule: ScheduleDto[];

  static fromEntity(entity): FilmDto {
    return {
      id: entity.id,
      rating: entity.rating,
      director: entity.director,
      tags: entity.tags,
      title: entity.title,
      about: entity.about,
      description: entity.description,
      image: entity.image,
      cover: entity.cover,
      schedule: entity.schedule.map((s: any) => ScheduleDto.fromEntity(s)),
    };
  }
}
