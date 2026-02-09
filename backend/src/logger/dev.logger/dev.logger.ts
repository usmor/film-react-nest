import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: string) {
    console.log(message);
  }

  error(message: string) {
    console.error(message);
  }
}
