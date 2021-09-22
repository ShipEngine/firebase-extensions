import { logger as firebaseLogger } from 'firebase-functions';
import { LogEntry, LogOptions, LogSeverity } from '../types';
import { BaseLogger } from './base-logger';

const colorize = require('json-colorizer');

import config from '../config';

/**
 * @class Logger
 */
export class ConsoleLogger extends BaseLogger {
  constructor(options?: LogOptions) {
    super(options);
  }
  write({ message, options, ...data }: LogEntry, severity: LogSeverity) {
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
              const array = value.slice(0, maxArrayLength);

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
