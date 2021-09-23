import { LogEntry, LogOptions, LogSeverity } from '../types';
import { cloneDeep } from 'lodash';
import { BaseLogger } from './base-logger';

const colorize = require('json-colorizer');

/**
 * @class Logger
 */
export class ConsoleLogger extends BaseLogger {
  constructor(options?: LogOptions) {
    super(options);
  }
  protected write(entry: LogEntry, severity: LogSeverity) {
    const { message, options, ...data } = cloneDeep(entry);
    const verbose = this.options.verbose || options?.verbose;
    const maxArrayLength = 3;
    const indent = 2;

    console.log(
      colorize(
        JSON.stringify(
          {
            severity,
            message,
            ...(verbose && data),
          },
          // Limit size of printed arrays
          function (this, key, value) {
            if (Array.isArray(value) && value.length >= maxArrayLength) {
              return [
                ...value.slice(0, maxArrayLength),
                '<Additional Items Hidden...>',
              ];
            }
            return value;
          },
          indent
        )
      )
    );
  }
}
