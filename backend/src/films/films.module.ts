import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsMongoDbRepository } from './repositories/films.mongodb.repository';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, FilmsMongoDbRepository],
  exports: [FilmsMongoDbRepository],
})
export class FilmsModule {}
