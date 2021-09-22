// integration-test/test/test.js
import { assert, expect } from 'chai';
import * as admin from 'firebase-admin';
import {
  deleteCollection,
  waitForDocumentUpdate,
} from 'shipengine-firebase-common';
import * as inputPayload from './input-payload.json';

const DB_COLLECTION = 'labels';

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

describe('getLabelTrackingData', async () => {
  it('returns tracking data for a label', async () => {
    // Add new shipment to db
    const newLabel = await db.collection(DB_COLLECTION).add(inputPayload);

    // Wait for firestore event handler to finish
    const update = await waitForDocumentUpdate(newLabel, 'tracking');

    // Assertions
    assert(expect(update).is.not.empty);
  });
});
