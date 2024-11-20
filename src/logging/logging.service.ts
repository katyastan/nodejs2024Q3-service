import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService implements LoggerService {
  private logStream = fs.createWriteStream(
    path.join(__dirname, '../../app.log'),
    { flags: 'a' },
  );

  log(message: string) {
    this.writeLog('LOG', message);
  }

  error(message: string, trace?: string) {
    this.writeLog('ERROR', message, trace);
  }

  warn(message: string) {
    this.writeLog('WARN', message);
  }

  debug(message: string) {
    this.writeLog('DEBUG', message);
  }

  verbose(message: string) {
    this.writeLog('VERBOSE', message);
  }

  private writeLog(level: string, message: string, trace?: string) {
    const logMessage = `${new Date().toISOString()} [${level}] ${message}${
      trace ? ` - ${trace}` : ''
    }\n`;
    this.logStream.write(logMessage);
    console.log(logMessage);
  }
}
