import {
  IsString,
  IsNumber,
  IsUUID,
  IsArray,
  IsDateString,
} from 'class-validator';

export class ScheduleDto {
  @IsUUID()
  id: string;

  @IsDateString()
  daytime: string;

  @IsString()
  hall: string;

  @IsNumber()
  rows: number;

  @IsNumber()
  seats: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  taken: string[];

  static fromEntity(entity): ScheduleDto {
    return {
      id: entity.id,
      daytime: entity.daytime.toISOString(),
      hall: entity.hall.toString(),
      rows: entity.rows,
      seats: entity.seats,
      price: entity.price,
      taken: entity.taken,
    };
  }
}
