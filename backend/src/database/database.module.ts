import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../schedules/entities/schedule.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsMongoDbRepository } from '../films/repositories/films.mongodb.repository';
import { FilmsTypeOrmRepository } from '../films/repositories/film.typeorm.repository';
import { FilmSchema, Film as FilmMongo } from '../films/schemas/film.schema';
import 'dotenv/config';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const driver = process.env.DATABASE_DRIVER || 'mongodb';
    const imports = [];
    const providers = [];

    switch (driver) {
      case 'mongodb':
        imports.push(
          MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
             uri: config.get<string>('DATABASE_URL', 'mongodb://localhost:27017/afisha'),
            }),
          }),
          MongooseModule.forFeature([
            { name: FilmMongo.name, schema: FilmSchema },
          ]),
        );
        providers.push(
          { provide: 'FilmsRepository', useClass: FilmsMongoDbRepository },
          FilmsMongoDbRepository,
        );
        break;

      case 'postgres':
        imports.push(
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              type: 'postgres',
              host: config.get<string>('DATABASE_HOST', 'localhost'),
              port: config.get<number>('DATABASE_PORT', 5432),
              username: config.get<string>('DATABASE_USERNAME', 'prac'),
              password: config.get<string>('DATABASE_PASSWORD', 'prac'),
              database: config.get<string>('DATABASE_NAME', 'prac'),
              entities: [Film, Schedule],
              synchronize: config.get<boolean>('DATABASE_SYNCHRONIZE', false),
              logging: true,
            }),
          }),
          TypeOrmModule.forFeature([Film, Schedule]),
        );
        providers.push(
          { provide: 'FilmsRepository', useClass: FilmsTypeOrmRepository },
          FilmsTypeOrmRepository,
        );
        break;
    }
    return {
      module: DatabaseModule,
      imports,
      providers,
      exports: ['FilmsRepository', ...imports],
    };
  }
}
