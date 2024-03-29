// integration-test/test/test.js
import { assert, expect } from 'chai';
import * as admin from 'firebase-admin';
import {
  deleteCollection,
  waitForDocumentUpdate,
} from 'shipengine-firebase-common-lib';

import * as inputPayload from './input-payload.json';

const DB_COLLECTION = 'orders';

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

describe('purchaseLabel', async function () {
  this.timeout(15000);

  it('returns the purchase label result', async function () {
    this.timeout(15000);

    // Add new shipment to db
    const newOrder = await db.collection(DB_COLLECTION).add(inputPayload);

    // Wait for result
    const update = await waitForDocumentUpdate(newOrder, 'shippingLabel');

    // Assertions
    assert(expect(update.shippingLabel).is.not.undefined);
    assert(expect(update.shippingLabel.labelId).is.not.undefined);
  });
});
