"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.complete = exports.errorUpdatingParent = exports.parentUpdated = exports.parentUpdating = exports.start = exports.initError = exports.init = exports.obfuscateConfig = void 0;
var firebase_functions_1 = require("firebase-functions");
var obfuscateConfig = function (config) {
    return __assign(__assign({}, config), { shipEngineApiKey: '<omitted>' });
};
exports.obfuscateConfig = obfuscateConfig;
var init = function (config) {
    firebase_functions_1.logger.log('Initializing extension with configuration:', (0, exports.obfuscateConfig)(config));
};
exports.init = init;
var initError = function (error) {
    firebase_functions_1.logger.error('Error when initializing extension.');
};
exports.initError = initError;
var start = function (data) {
    firebase_functions_1.logger.log('Started extension execution: ', data);
};
exports.start = start;
var parentUpdating = function (update) {
    firebase_functions_1.logger.debug('Parent ref updating', update);
};
exports.parentUpdating = parentUpdating;
var parentUpdated = function () {
    firebase_functions_1.logger.debug('Parent ref updated');
};
exports.parentUpdated = parentUpdated;
var errorUpdatingParent = function (error) {
    firebase_functions_1.logger.error('Error updating parent', error);
};
exports.errorUpdatingParent = errorUpdatingParent;
var complete = function () {
    firebase_functions_1.logger.info('Completed execution of extension');
};
exports.complete = complete;
//# sourceMappingURL=logs.js.map