import { Inject, Injectable } from '@nestjs/common';
import {
  LOGGING_MODULE_OPTIONS_TOKEN,
  LoggingModuleOptions,
} from '../example2.module-defination';

@Injectable()
export class LoggingService {
  constructor(
    @Inject(LOGGING_MODULE_OPTIONS_TOKEN)
    private readonly options: LoggingModuleOptions,
  ) {}

  log(message: string, level: 'debug' | 'info' | 'warn' | 'error' = 'info') {
    const levels = ['debug', 'info', 'warn', 'error'];
    if (levels.indexOf(level) >= levels.indexOf(this.options.level)) {
      console.log(`[${level.toUpperCase()}] - ${message}`);
    }
  }
}
