type FirestoreDoc =
  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;

/**
 *
 * @param doc
 * @returns
 */
export async function waitForDocumentUpdate(
  doc: FirestoreDoc
): Promise<FirestoreDoc> {
  return new Promise((resolve, reject) => {
    // Create snapshot listener on document and return updated data
    doc.onSnapshot((snapshot) => {
      const data = snapshot.data() as FirestoreDoc;
      resolve(data);
    }, reject);
  });
}
