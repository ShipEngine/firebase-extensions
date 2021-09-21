// integration-test/test/test.js
import { assert, expect } from 'chai';
import * as admin from 'firebase-admin';
import { waitForDocumentUpdate } from 'shipengine-firebase-common';
import * as inputPayload from './input-payload.json';

const DB_COLLECTION = 'labels';
// type FirestoreLabel = InputPayload & ResponsePayload;
/*
 * ============
 *    Setup
 * ============
 */
admin.initializeApp();
const db = admin.firestore();
db.settings({
  host: 'localhost:3000',
  ssl: false,
});

/*
 * ============
 *  Test Cases
 * ============
 */
beforeEach(async () => {
  // Clear the database between tests
  void deleteCollection(DB_COLLECTION);
});

async function deleteCollection(path: string) {
  const batch = db.batch();
  const documents = await db.collection(path).listDocuments();
  for (const doc of documents) {
    batch.delete(doc);
  }
  batch.commit();
}

// type FirestoreDoc =
//   FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;

// async function waitForDocumentUpdate(doc: FirestoreDoc): Promise<FirestoreDoc> {
//   return new Promise((resolve, reject) => {
//     doc.onSnapshot((snapshot) => {
//       const data = snapshot.data() as FirestoreDoc;
//       resolve(data);
//     }, reject);
//   });
// }

describe('getLabelTrackingData', async () => {
  it('returns tracking data for a label', async () => {
    // Add new shipment to db
    const newLabel = await db.collection(DB_COLLECTION).add(inputPayload);

    // Wait for firestore event handler to finish
    const update = await waitForDocumentUpdate(newLabel);
    // new Promise((resolve, reject) => {
    //   newLabel.onSnapshot((snapshot) => {
    //     const data = snapshot.data();
    //     resolve(data);
    //   }, reject);
    // });
    // await waitForEvent<FirestoreLabel>(newLabel);

    assert(expect(update).is.not.empty);
  });
});
