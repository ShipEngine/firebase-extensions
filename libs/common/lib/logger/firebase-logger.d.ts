import { LogEntry, LogOptions, LogSeverity } from '../types';
import { BaseLogger } from './base-logger';
/**
 * @class Logger
 */
export declare class FirebaseLogger extends BaseLogger {
    constructor(options?: LogOptions);
    protected write({ message, options, ...data }: LogEntry, severity: LogSeverity): void;
}
//# sourceMappingURL=firebase-logger.d.ts.map