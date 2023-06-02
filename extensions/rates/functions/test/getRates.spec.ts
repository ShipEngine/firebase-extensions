// integration-test/test/test.js
import { assert, expect } from 'chai';
import * as admin from 'firebase-admin';
import {
  deleteCollection,
  waitForDocumentUpdate,
} from 'shipengine-firebase-common-lib';
import * as inputPayload from './input-payload.json';

const DB_COLLECTION = 'shipments';

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

describe('getRates', async function () {
  this.timeout(15000);

  it('returns the get rates result', async function () {
    this.timeout(15000);

    // Add new shipment to db
    const newShipment = await db.collection(DB_COLLECTION).add(inputPayload);

    // Wait for result
    const update = await waitForDocumentUpdate(newShipment, 'rates');

    // Assertions
    assert(expect(update.rates).is.not.empty);
    assert(expect(update.rates.length).to.be.greaterThan(0));
  });
});
