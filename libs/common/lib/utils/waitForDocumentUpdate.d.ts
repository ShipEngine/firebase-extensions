declare type FirestoreDoc =
  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
/**
 *
 * @param doc
 * @returns
 */
export declare function waitForDocumentUpdate(
  doc: FirestoreDoc,
  successField: string
): Promise<any>;
export {};
//# sourceMappingURL=waitForDocumentUpdate.d.ts.map
