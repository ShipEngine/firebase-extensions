import { LogEntry, LogOptions, LogSeverity } from '../types';
import { BaseLogger } from './base-logger';
/**
 * @class Logger
 */
export declare class ConsoleLogger extends BaseLogger {
    constructor(options?: LogOptions);
    protected write({ message, options, ...data }: LogEntry, severity: LogSeverity): void;
}
//# sourceMappingURL=console-logger.d.ts.map