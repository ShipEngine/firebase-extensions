import { LogEntry } from './types';
/**
 * @class Logger
 */
declare class Logger {
  private options;
  constructor();
  debug(entry: LogEntry): void;
  log(entry: LogEntry): void;
  info(entry: LogEntry): void;
  warn(entry: LogEntry): void;
  error(entry: LogEntry): void;
  private write;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map
