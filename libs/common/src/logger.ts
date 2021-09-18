import { logger as firebaseLogger } from 'firebase-functions';
import { LogEntry, LogOptions, LogSeverity } from './types';
import config from './config';

/**
 * @class Logger
 */
class Logger {
  private options: LogOptions;

  constructor() {
    this.options = {
      verbose: config.verboseLogOutput,
    };
  }

  public debug(entry: LogEntry): void {
    this.write(entry, 'DEBUG');
  }
  public log(entry: LogEntry): void {
    this.write(entry, 'INFO');
  }
  public info(entry: LogEntry): void {
    this.write(entry, 'INFO');
  }
  public warn(entry: LogEntry): void {
    this.write(entry, 'WARNING');
  }
  public error(entry: LogEntry): void {
    this.write(entry, 'ERROR');
  }
  private write({ message, ...data }: LogEntry, severity: LogSeverity) {
    void firebaseLogger.write({
      severity,
      message,
      ...(this.options.verbose && data),
    });
  }
}

const logger = new Logger();

export default logger;
