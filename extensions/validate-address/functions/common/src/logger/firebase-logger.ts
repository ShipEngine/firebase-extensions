import { logger as firebaseLogger } from 'firebase-functions';
import { LogEntry, LogOptions, LogSeverity } from '../types';
import { BaseLogger } from './base-logger';

/**
 * @class Logger
 */
export class FirebaseLogger extends BaseLogger {
  constructor(options?: LogOptions) {
    super(options);
  }
  protected write(
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
