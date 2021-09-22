'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.complete =
  exports.errorUpdatingParent =
  exports.parentUpdated =
  exports.parentUpdating =
  exports.start =
  exports.initError =
  exports.init =
  exports.obfuscateConfig =
    void 0;
const logger_1 = require('./logger');
const obfuscateConfig = (config) => {
  return Object.assign(Object.assign({}, config), {
    shipEngineApiKey: '<omitted>',
  });
};
exports.obfuscateConfig = obfuscateConfig;
const init = (config) => {
  logger_1.logger.log({
    message: 'Initializing extension with configuration',
    options: {
      verbose: true,
    },
    config: (0, exports.obfuscateConfig)(config),
  });
};
exports.init = init;
const initError = (error) => {
  logger_1.logger.error({
    message: 'Error when initializing extension',
    error,
  });
};
exports.initError = initError;
const start = (data) => {
  logger_1.logger.log({
    message: 'Started extension execution',
    data,
  });
};
exports.start = start;
const parentUpdating = (update) => {
  logger_1.logger.debug({
    message: 'Parent ref updating',
    update,
  });
};
exports.parentUpdating = parentUpdating;
const parentUpdated = () => {
  logger_1.logger.debug({
    message: 'Parent ref updated',
  });
};
exports.parentUpdated = parentUpdated;
const errorUpdatingParent = (error) => {
  logger_1.logger.error({
    message: 'Error updating parent',
    error,
  });
};
exports.errorUpdatingParent = errorUpdatingParent;
const complete = () => {
  logger_1.logger.info({
    message: 'Completed execution of extension',
  });
};
exports.complete = complete;
//# sourceMappingURL=logs.js.map
