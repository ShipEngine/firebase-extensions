import * as functions from "firebase-functions";
import ShipEngine, { ValidateAddressesTypes } from 'shipengine';

import { AddressValidationResult as ValidatedAddress } from './types';
import config from './config';
import * as logs from './logs';

interface InputPayload {
  [key: string]: any
}

// Initialize ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init();

export const validateAddress = functions.handler.firestore.document.onWrite(
  async (change) => {
    logs.start();

    const data = change.after.data() as InputPayload;
    const address = data[config.addressKey] as ValidateAddressesTypes.Params[number];

    if (!address) {
      logs.addressMissing();
    }

    const params: ValidateAddressesTypes.Params = [address];

    let update: ValidatedAddress;

    /**
     * Validate Address
     */
    try {
      logs.addressValidating();

      // fetch validated address
      const [result]: ValidateAddressesTypes.Result[number][] = await shipEngine.validateAddresses(params);

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
      logs.errorValidateAddress(err as Error);
      return;
    }

    logs.addressValidated(update);

    /**
     * Update Reference
     */
      try {
        logs.parentUpdating();
        change.after.ref.update(update);
        logs.parentUpdated()
      } catch (err) {
        logs.errorUpdatingParent(err as Error);
        return;
      }
  }
)