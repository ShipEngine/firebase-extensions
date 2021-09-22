'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.hasInputChanged = void 0;
const lodash_1 = require('lodash');
const hasInputChanged = (change, castFn) => {
  if (!change.before.exists) return true; // The document was just inserted
  if (!change.after.exists) return false; // The document is being deleted
  // The input has changed since the last update
  return !(0, lodash_1.isEqual)(
    castFn(change.after.data()),
    castFn(change.before.data())
  );
};
exports.hasInputChanged = hasInputChanged;
