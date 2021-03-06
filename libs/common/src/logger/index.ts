import { FirebaseLogger } from './firebase-logger';
import { ConsoleLogger } from './console-logger';
import config from '../config';

const isTest = config.environment == 'test';

export const logger = isTest ? new ConsoleLogger() : new FirebaseLogger();
