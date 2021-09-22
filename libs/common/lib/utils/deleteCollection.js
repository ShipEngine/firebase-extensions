'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteCollection = void 0;
async function deleteCollection(path, db) {
  const batch = db.batch();
  const documents = await db.collection(path).listDocuments();
  for (const doc of documents) {
    batch.delete(doc);
  }
  batch.commit();
}
exports.deleteCollection = deleteCollection;
//# sourceMappingURL=deleteCollection.js.map
