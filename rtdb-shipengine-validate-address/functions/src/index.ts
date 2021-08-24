import * as functions from 'firebase-functions';
import ShipEngine, { ValidateAddressesTypes } from 'shipengine';
import { AddressValidationResult, Status } from './types';
import config from './config';

export const validateAddress = functions.handler.database.instance.ref.onWrite(
  async (change, context): Promise<void> => {
    const data = change.after.val();
    const parent = change.after.ref.parent;
    const params: ValidateAddressesTypes.Params = [data];
    // Parent should be a list item
    if (!parent) return;

    try {
      // Create ShipEngine client
      const se = new ShipEngine(config.shipengineApiKey);
      // Validate Address
      const [result] = await se.validateAddresses(params);
      // Build node update based on the result status
      const update: AddressValidationResult = { status: result.status };

      switch (result.status) {
        case Status.Verified:
          update.messages = result.messages;
          update.normalizedAddress = result.normalizedAddress;
          break;
        case Status.Warning:
          update.normalizedAddress = result.normalizedAddress;
        case Status.Unverified:
        case Status.Error:
          update.messages = result.messages;
          break;
      }

      // Update parent element with result
      void parent.update(update, (err) => {
        if (err) throw err;
        else functions.logger.info('Address Validation Complete!');
        return;
      });
    } catch (err) {
      // Log fatal error
      functions.logger.error('Error validating address.', err);
      return;
    }
  }
);
