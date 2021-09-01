import * as functions from "firebase-functions";
import { logger } from 'firebase-functions';
import ShipEngine, { ValidateAddressesTypes } from 'shipengine';
import { AddressValidationResult as ValidatedAddress } from './types';

// Init ShipEngine js
let shipengine: ShipEngine;
try {
  logger.log('Init shipengine');
} catch(err) {
  logger.error(err);
}

interface InputPayload {
  address: ValidateAddressesTypes.Params[number]
}

export const validateAddress = functions.handler.firestore.document.onWrite(
  async (change) => {
    const { address } = change.after.data() as InputPayload;
    const params: ValidateAddressesTypes.Params = [address];
    const ref = change.after.ref;

    if (address) {
      logger.error('Address data missing')
    }

    let result: ValidateAddressesTypes.Result[number];
    let update: ValidatedAddress;

    /**
     * Validate Address
     */
    try {
      // logs.addressValidating();

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
      logger.error('Error validating address');
      return;
    }

    /**
     * Update Reference
     */
      try {
        // logs.parentUpdating();
        const updateResult = ref.update(update);
        logger.info('Document updated: ', updateResult);
      } catch (err) {
        logger.error(err);
        return;
      }
  }
)
