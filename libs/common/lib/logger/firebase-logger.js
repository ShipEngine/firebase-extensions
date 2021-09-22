'use strict';
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FirebaseLogger = void 0;
const firebase_functions_1 = require('firebase-functions');
const base_logger_1 = require('./base-logger');
/**
 * @class Logger
 */
class FirebaseLogger extends base_logger_1.BaseLogger {
  constructor(options) {
    super(options);
  }
  write(_a, severity) {
    var { message, options } = _a,
      data = __rest(_a, ['message', 'options']);
    const verbose =
      this.options.verbose ||
      (options === null || options === void 0 ? void 0 : options.verbose);
    void firebase_functions_1.logger.write(
      Object.assign({ severity, message }, verbose && data)
    );
  }
}
exports.FirebaseLogger = FirebaseLogger;
