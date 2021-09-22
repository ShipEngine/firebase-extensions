"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    verboseLogOutput: process.env.VERBOSE_LOG_OUTPUT == 'true' || true,
    environment: process.env.ENVIRONMENT || 'test',
};
