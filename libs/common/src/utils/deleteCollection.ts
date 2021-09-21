export async function deleteCollection(
  path: string,
  db: FirebaseFirestore.Firestore
) {
  const batch = db.batch();
  const documents = await db.collection(path).listDocuments();
  for (const doc of documents) {
    batch.delete(doc);
  }
  batch.commit();
}
