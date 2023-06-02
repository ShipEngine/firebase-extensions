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
exports.BaseLogger = void 0;
const config_1 = require('../config');
class BaseLogger {
  get options() {
    return this._options;
  }
  set options(value) {
    this._options = value;
  }
  constructor(options) {
    this._options = options || {
      verbose: config_1.default.verboseLogOutput,
      maxArrayLength: 3,
    };
  }
  /**
   * Logs a debug entry
   */
  debug(entry) {
    this.write(entry, 'DEBUG');
  }
  /**
   * Logs an entry with the specified severity
   */
  log(_a) {
    var { severity, message } = _a,
      data = __rest(_a, ['severity', 'message']);
    if (!severity) severity = 'INFO';
    this.write(Object.assign({ message }, data), 'INFO');
  }
  /**
   * Logs an informational entry
   */
  info(entry) {
    this.write(entry, 'INFO');
  }
  /**
   * Logs a warning entry
   */
  warn(entry) {
    this.write(entry, 'WARNING');
  }
  /**
   * Logs a non-fatal error entry
   */
  error(entry) {
    this.write(entry, 'ERROR');
  }
}
exports.BaseLogger = BaseLogger;
