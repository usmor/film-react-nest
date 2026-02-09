import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const params = optionalParams.length > 0 ? JSON.stringify(optionalParams) : '';
    const timestamp = new Date().toISOString()
    return `level=${level}\tmessage=${message}\toptionalParams=${params}\ttimestamp=${timestamp}`;
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('error', message, optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('warn', message, optionalParams));
  }

  debug?(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('debug', message, optionalParams));
  }

  verbose?(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('verbose', message, optionalParams));
  }

  fatal?(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('fatal', message, optionalParams));
  }
}

