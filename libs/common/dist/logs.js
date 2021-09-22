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
exports.__esModule = true;
exports.complete =
  exports.errorUpdatingParent =
  exports.parentUpdated =
  exports.parentUpdating =
  exports.start =
  exports.initError =
  exports.init =
  exports.obfuscateConfig =
    void 0;
var logger_1 = require('./logger');
var obfuscateConfig = function (config) {
  return __assign(__assign({}, config), { shipEngineApiKey: '<omitted>' });
};
exports.obfuscateConfig = obfuscateConfig;
var init = function (config) {
  logger_1.logger.log({
    message: 'Initializing extension with configuration',
    options: {
      verbose: true,
    },
    config: (0, exports.obfuscateConfig)(config),
  });
};
exports.init = init;
var initError = function (error) {
  logger_1.logger.error({
    message: 'Error when initializing extension',
    error: error,
  });
};
exports.initError = initError;
var start = function (data) {
  logger_1.logger.log({
    message: 'Started extension execution',
    data: data,
  });
};
exports.start = start;
var parentUpdating = function (update) {
  logger_1.logger.debug({
    message: 'Parent ref updating',
    update: update,
  });
};
exports.parentUpdating = parentUpdating;
var parentUpdated = function () {
  logger_1.logger.debug({
    message: 'Parent ref updated',
  });
};
exports.parentUpdated = parentUpdated;
var errorUpdatingParent = function (error) {
  logger_1.logger.error({
    message: 'Error updating parent',
    error: error,
  });
};
exports.errorUpdatingParent = errorUpdatingParent;
var complete = function () {
  logger_1.logger.info({
    message: 'Completed execution of extension',
  });
};
exports.complete = complete;
//# sourceMappingURL=logs.js.map
