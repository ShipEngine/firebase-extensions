declare type FirestoreDoc =
  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
/**
 *
 * @param doc
 * @returns
 */
export declare function waitForDocumentUpdate(
  doc: FirestoreDoc
): Promise<FirestoreDoc>;
export {};
//# sourceMappingURL=waitForDocumentUpdate.d.ts.map
