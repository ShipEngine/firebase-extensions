'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.handleUpdateDocument = void 0;
const logs = require('../logs');
const handleUpdateDocument = async (snapshot, update) => {
  logs.parentUpdating(update);
  try {
    await snapshot.ref.update(update);
    logs.parentUpdated();
  } catch (err) {
    logs.errorUpdatingParent(err);
    throw err;
  }
};
exports.handleUpdateDocument = handleUpdateDocument;
//# sourceMappingURL=handleUpdateDocument.js.map
