import { LogOptions, LogEntry, LogSeverity } from '../types';
import config from '../config';

export abstract class BaseLogger {
  private _options: LogOptions;

  public get options(): LogOptions {
    return this._options;
  }
  public set options(value: LogOptions) {
    this._options = value;
  }

  constructor(options?: LogOptions) {
    this._options = options || {
      verbose: config.verboseLogOutput,
      maxArrayLength: 3,
    };
  }

  /**
   * Logs a debug entry
   */
  public debug(entry: LogEntry): void {
    this.write(entry, 'DEBUG');
  }
  /**
   * Logs an entry with the specified severity
   */
  public log({
    severity,
    message,
    ...data
  }: LogEntry & { severity?: LogSeverity }): void {
    if (!severity) severity = 'INFO';
    this.write(
      {
        message,
        ...data,
      },
      'INFO'
    );
  }
  /**
   * Logs an informational entry
   */
  public info(entry: LogEntry): void {
    this.write(entry, 'INFO');
  }
  /**
   * Logs a warning entry
   */
  public warn(entry: LogEntry): void {
    this.write(entry, 'WARNING');
  }
  /**
   * Logs a non-fatal error entry
   */
  public error(entry: LogEntry): void {
    this.write(entry, 'ERROR');
  }

  protected abstract write(entry: LogEntry, severity: LogSeverity): void;
}
