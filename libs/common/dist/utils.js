'use strict';
exports.__esModule = true;
exports.handleUpdateDocument = void 0;
var logs = require('./logs');
var handleUpdateDocument = function (snapshot, update) {
  logs.parentUpdating(update);
  try {
    snapshot.ref.update(update);
    logs.parentUpdated();
  } catch (err) {
    logs.errorUpdatingParent(err);
    throw err;
  }
};
exports.handleUpdateDocument = handleUpdateDocument;
//# sourceMappingURL=utils.js.map
