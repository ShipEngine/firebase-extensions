'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
var config_1 = require('../config');
var BaseLogger = /** @class */ (function () {
  function BaseLogger(options) {
    this.options = options || {
      verbose: config_1.default.verboseLogOutput,
      maxArrayLength: 3,
    };
  }
  Object.defineProperty(BaseLogger.prototype, 'options', {
    get: function () {
      return this._options;
    },
    set: function (value) {
      this._options = value;
    },
    enumerable: false,
    configurable: true,
  });
  /**
   * Logs a debug entry
   */
  BaseLogger.prototype.debug = function (entry) {
    this.write(entry, 'DEBUG');
  };
  /**
   * Logs an entry with the specified severity
   */
  BaseLogger.prototype.log = function (_a) {
    var severity = _a.severity,
      message = _a.message,
      data = __rest(_a, ['severity', 'message']);
    if (!severity) severity = 'INFO';
    this.write(__assign({ message: message }, data), 'INFO');
  };
  /**
   * Logs an informational entry
   */
  BaseLogger.prototype.info = function (entry) {
    this.write(entry, 'INFO');
  };
  /**
   * Logs a warning entry
   */
  BaseLogger.prototype.warn = function (entry) {
    this.write(entry, 'WARNING');
  };
  /**
   * Logs a non-fatal error entry
   */
  BaseLogger.prototype.error = function (entry) {
    this.write(entry, 'ERROR');
  };
  return BaseLogger;
})();
exports.BaseLogger = BaseLogger;
//# sourceMappingURL=base-logger.js.map
