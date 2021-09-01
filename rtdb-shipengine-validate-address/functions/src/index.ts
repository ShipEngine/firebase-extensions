import * as functions from 'firebase-functions';
import ShipEngine, { ValidateAddressesTypes } from 'shipengine';
import { AddressValidationResult as ValidatedAddress } from './types';
import config from './config';
import * as logs from './logs';

let shipengine: ShipEngine;
try {
  logs.init();
  shipengine = new ShipEngine(config.shipengineApiKey);
} catch (err) {
  logs.initError(err);
}

export const validateAddress = functions.handler.database.instance.ref.onWrite(
  async (change, context): Promise<void> => {
    logs.start();
    const data = change.after.val();
    const parent = change.after.ref.parent;
    const params: ValidateAddressesTypes.Params = [data];
    if (!shipengine) {
      logs.shipengineInitError();
      return;
    }
    // Parent should be a list item
    if (!parent) {
      logs.parentRefernceError();
      return;
    }

    let result: ValidateAddressesTypes.Result[number];
    let update: ValidatedAddress;

    /**
     * Validate Address
     */
    try {
      logs.addressValidating();

      // fetch validated address
      [result] = await shipengine.validateAddresses(params);

      // Build node update based on the result status
      update = { status: result.status };
      switch (update.status) {
        case 'verified':
          update.normalizedAddress = result.normalizedAddress;
          break;
        case 'warning':
          update.normalizedAddress = result.normalizedAddress;
        case 'unverified':
        case 'error':
          update.messages = result.messages;
          break;
      }
    } catch (err) {
      // Log fatal error
      logs.errorValidateAddress(err);
      return;
    }
    logs.addressValidated(update.status);

    /**
     * Update Reference
     */
    try {
      logs.parentUpdating();

      // Update parent element with result
      // path: /(collection)/{addressId}
      parent.update(update, (err) => {
        if (err) throw err;
        logs.parentUpdated();
      });
    } catch (err) {
      logs.errorUpdateParent(err);
      return;
    }

    logs.complete();
  }
);
