import { LogOptions, LogEntry, LogSeverity } from '..';
export declare abstract class BaseLogger {
  private _options;
  get options(): LogOptions;
  set options(value: LogOptions);
  constructor(options?: LogOptions);
  /**
   * Logs a debug entry
   */
  debug(entry: LogEntry): void;
  /**
   * Logs an entry with the specified severity
   */
  log({
    severity,
    message,
    ...data
  }: LogEntry & {
    severity?: LogSeverity;
  }): void;
  /**
   * Logs an informational entry
   */
  info(entry: LogEntry): void;
  /**
   * Logs a warning entry
   */
  warn(entry: LogEntry): void;
  /**
   * Logs a non-fatal error entry
   */
  error(entry: LogEntry): void;
  protected abstract write(entry: LogEntry, severity: LogSeverity): void;
}
//# sourceMappingURL=base-logger.d.ts.map
