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
  private write(
    { message, options, ...data }: LogEntry,
    severity: LogSeverity
  ) {
    const verbose = this.options.verbose || options?.verbose;

    void firebaseLogger.write({
      severity,
      message,
      ...(verbose && data),
    });
  }
}

export const logger = new Logger();
