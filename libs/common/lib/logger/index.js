'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.logger = void 0;
var firebase_logger_1 = require('./firebase-logger');
var console_logger_1 = require('./console-logger');
var config_1 = require('../config');
var isTest = config_1.default.environment === 'test';
exports.logger = isTest
  ? new console_logger_1.ConsoleLogger()
  : new firebase_logger_1.FirebaseLogger();
//# sourceMappingURL=index.js.map
