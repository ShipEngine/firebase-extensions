import * as functions from "firebase-functions";
import ShipEngine, { ValidateAddressesTypes } from 'shipengine';
import { AddressValidationResult as ValidatedAddress } from './types';
import * as logs from './logs';

// Init ShipEngine js
let shipengine: ShipEngine;
try {
  logs.init();
  shipengine = new ShipEngine(process.env.SHIPENGINE_API_KEY!)
} catch(err) {
  logs.initError(err);
}

interface InputPayload {
  address: ValidateAddressesTypes.Params[number]
}

export const validateAddress = functions.handler.firestore.document.onWrite(
  async (change) => {
    logs.start();

    const data = change.after.data() as InputPayload;
    const params: ValidateAddressesTypes.Params = [data.address];
    const ref = change.after.ref;

    if (!data.address) {
      logs.addressMissing();
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
        // logs.parentUpdating();
        const updateResult = ref.update(update);
        logs.parentUpdated()
      } catch (err) {
        logs.errorUpdateParent(err);
        return;
      }
  }
)
