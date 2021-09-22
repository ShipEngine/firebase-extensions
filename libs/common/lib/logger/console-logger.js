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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ConsoleLogger = void 0;
var base_logger_1 = require('./base-logger');
var colorize = require('json-colorizer');
/**
 * @class Logger
 */
var ConsoleLogger = /** @class */ (function (_super) {
  __extends(ConsoleLogger, _super);
  function ConsoleLogger(options) {
    return _super.call(this, options) || this;
  }
  ConsoleLogger.prototype.write = function (_a, severity) {
    var message = _a.message,
      options = _a.options,
      data = __rest(_a, ['message', 'options']);
    var verbose =
      this.options.verbose ||
      (options === null || options === void 0 ? void 0 : options.verbose);
    var maxArrayLength = 3;
    var indent = 2;
    console.log(
      colorize(
        JSON.stringify(
          __assign({ severity: severity, message: message }, verbose && data),
          // Limit size of printed arrays
          function (key, value) {
            if (Array.isArray(value) && value.length >= maxArrayLength) {
              var array = value.slice(0, maxArrayLength);
              return __spreadArray(
                __spreadArray([], value.slice(0, maxArrayLength), true),
                ['<Additional Items Hidden...>'],
                false
              );
            }
            return value;
          },
          indent
        )
      )
    );
  };
  return ConsoleLogger;
})(base_logger_1.BaseLogger);
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=console-logger.js.map
