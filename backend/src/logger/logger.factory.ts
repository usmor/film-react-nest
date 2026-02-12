import { Injectable } from '@nestjs/common';
import { DevLogger } from './dev.logger/dev.logger';
import { JsonLogger } from './json.logger/json.logger';
import { TskvLogger } from './tskv.logger/tskv.logger';

export type LoggerType = 'dev' | 'json' | 'tskv';

@Injectable()
export class LoggerFactory {
  static initializeLogger(type: LoggerType) {
    switch (type) {
      case 'dev':
        return new DevLogger();
      case 'json':
        return new JsonLogger();
      case 'tskv':
        return new TskvLogger();
      default:
        return new DevLogger();
    }
  }
}
