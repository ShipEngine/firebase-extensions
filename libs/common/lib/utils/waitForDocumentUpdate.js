'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.waitForDocumentUpdate = void 0;
/**
 *
 * @param doc
 * @returns
 */
async function waitForDocumentUpdate(doc) {
  return new Promise((resolve, reject) => {
    // Create snapshot listener on document and return updated data
    doc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      resolve(data);
    }, reject);
  });
}
exports.waitForDocumentUpdate = waitForDocumentUpdate;
//# sourceMappingURL=waitForDocumentUpdate.js.map
