import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { LoggerFactory, LoggerType } from './logger/logger.factory';

async function bootstrap() {
  const loggerType = (process.env.LOGGER_TYPE || 'dev') as LoggerType;
  const logger = LoggerFactory.initializeLogger(loggerType)
  
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
