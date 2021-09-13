"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complete = exports.errorUpdatingParent = exports.parentUpdated = exports.parentUpdating = exports.start = exports.initError = exports.init = exports.obfuscatedConfig = void 0;
const firebase_functions_1 = require("firebase-functions");
const config_1 = require("./config");
exports.obfuscatedConfig = Object.assign(Object.assign({}, config_1.default), { shipengineApiKey: '<omitted>' });
exports.init = () => {
    firebase_functions_1.logger.log(`Initializing extension with configuration: `, exports.obfuscatedConfig);
};
exports.initError = (error) => {
    firebase_functions_1.logger.error('Error when initializing extension');
};
exports.start = () => {
    firebase_functions_1.logger.log('Started extension execution with configuration', exports.obfuscatedConfig);
};
exports.parentUpdating = () => {
    firebase_functions_1.logger.debug('Parent ref updating');
};
exports.parentUpdated = () => {
    firebase_functions_1.logger.debug('Parent ref updated');
};
exports.errorUpdatingParent = (error) => {
    firebase_functions_1.logger.error('Error updating parent', error);
};
exports.complete = () => {
    firebase_functions_1.logger.info('Completed execution of extension');
};
//# sourceMappingURL=logs.js.map