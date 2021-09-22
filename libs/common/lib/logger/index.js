"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const firebase_logger_1 = require("./firebase-logger");
const console_logger_1 = require("./console-logger");
const config_1 = require("../config");
const isTest = config_1.default.environment == 'test';
exports.logger = isTest ? new console_logger_1.ConsoleLogger() : new firebase_logger_1.FirebaseLogger();
