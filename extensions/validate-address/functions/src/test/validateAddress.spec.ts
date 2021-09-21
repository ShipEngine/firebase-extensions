import { assert, expect } from 'chai';
import * as admin from 'firebase-admin';
import {
  deleteCollection,
  waitForDocumentUpdate,
} from 'shipengine-firebase-common';
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
  void deleteCollection(DB_COLLECTION, db);
});

describe('validateAddress', async () => {
  it('returns the validated address', async () => {
    // Add new address to db
    const newAddress = await db.collection(DB_COLLECTION).add(inputPayload);

    // Wait for result
    const update = await waitForDocumentUpdate(newAddress);

    // Assertions
    assert(expect(update).is.not.empty);
  });
});
