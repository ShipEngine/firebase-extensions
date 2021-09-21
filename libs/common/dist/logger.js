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
exports.__esModule = true;
var firebase_functions_1 = require('firebase-functions');
var config_1 = require('./config');
/**
 * @class Logger
 */
var Logger = /** @class */ (function () {
  function Logger() {
    this.options = {
      verbose: config_1['default'].verboseLogOutput,
    };
  }
  Logger.prototype.debug = function (entry) {
    this.write(entry, 'DEBUG');
  };
  Logger.prototype.log = function (entry) {
    this.write(entry, 'INFO');
  };
  Logger.prototype.info = function (entry) {
    this.write(entry, 'INFO');
  };
  Logger.prototype.warn = function (entry) {
    this.write(entry, 'WARNING');
  };
  Logger.prototype.error = function (entry) {
    this.write(entry, 'ERROR');
  };
  Logger.prototype.write = function (_a, severity) {
    var message = _a.message,
      options = _a.options,
      data = __rest(_a, ['message', 'options']);
    var verbose =
      this.options.verbose ||
      (options === null || options === void 0 ? void 0 : options.verbose);
    void firebase_functions_1.logger.write(
      __assign({ severity: severity, message: message }, verbose && data)
    );
  };
  return Logger;
})();
var logger = new Logger();
exports['default'] = logger;
//# sourceMappingURL=logger.js.map
