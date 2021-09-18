import { assert, expect } from 'chai';
import * as admin from 'firebase-admin';
import * as inputPayload from './input-payload.json';

const DB_COLLECTION = 'addresses';
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

describe('validateAddress', async () => {
  it('returns the validated address', async () => {
    // Add new address to db
    const newAddress = await db.collection(DB_COLLECTION).add(inputPayload);

    // Wait for result
    const update = await new Promise((resolve, reject) => {
      void newAddress.onSnapshot((snapshot) => {
        const data = snapshot.data();
        resolve(data);
      }, reject);
    });
    assert(expect(update).is.not.empty);
  });
});
