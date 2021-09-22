'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
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
exports.FirebaseLogger = void 0;
var firebase_functions_1 = require('firebase-functions');
var base_logger_1 = require('./base-logger');
/**
 * @class Logger
 */
var FirebaseLogger = /** @class */ (function (_super) {
  __extends(FirebaseLogger, _super);
  function FirebaseLogger(options) {
    return _super.call(this, options) || this;
  }
  FirebaseLogger.prototype.write = function (_a, severity) {
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
  return FirebaseLogger;
})(base_logger_1.BaseLogger);
exports.FirebaseLogger = FirebaseLogger;
//# sourceMappingURL=firebase-logger.js.map
