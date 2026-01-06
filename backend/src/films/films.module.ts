import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsMongoDbRepository } from './repositories/films.mongodb.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema } from './schemas/film.schema';
import { Film } from './schemas/film.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsMongoDbRepository],
  exports: [FilmsMongoDbRepository],
})
export class FilmsModule {}
