type FirestoreDoc =
  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;

export async function waitForDocumentUpdate(
  doc: FirestoreDoc,
  successField: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    // Create snapshot listener on document and return updated data
    doc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      // Check for success
      if (data[successField]) {
        resolve(data);
      }
    }, reject);
  });
}
