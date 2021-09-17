import * as functions from "firebase-functions";
import ShipEngine from 'shipengine';
import { Change } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/v1/firestore";
import { camelizeKeys } from "humps";
import { handleUpdateDocument } from "shipengine-firebase-common/src";

import { AddressValidationResult, InputPayload, RequestPayload, ResponsePayload, UpdatePayload } from './types';
import config from './config';
import logs from './logs';

// Initialize ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init(config);

export const validateAddress = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    if (!change.after.exists) return; // The document is being deleted
    
    let data = change.after.data() as InputPayload;

    // Support situations where the keys may be snake_cased
    data = camelizeKeys(data) as InputPayload;
    
    // Address validation already complete
    if (hasValidationData(data)) return;

    logs.start(data);

    // Validate Address
    const params = castParams(data);
    const update = await handleValidateAddress(params);
    
    // Update the parent document with the address validation results
    handleUpdateDocument(change.after, update);

    logs.complete();

    return;
  }
)

const hasValidationData = (data: InputPayload) => {
  return data['validation'] !== undefined;
}

const castParams = (data: InputPayload): RequestPayload => {
  return [data[config.addressKey]];
}

const handleValidateAddress = async (params: RequestPayload): Promise<UpdatePayload> => {
  logs.addressValidating(params);

  try {
    // fetch validated address and return first result in array
    const [result] = await shipEngine.validateAddresses(params) as ResponsePayload;

    logs.addressValidated(result);
    
    // Build the update object based on the result status
    const validationResult: AddressValidationResult = { status: result.status };

    switch (validationResult.status) {
      case 'verified':
        validationResult.normalizedAddress = result.normalizedAddress;
        break;
      case 'warning':
        validationResult.normalizedAddress = result.normalizedAddress;
      case 'unverified':
      case 'error':
        validationResult.messages = result.messages;
        break;
    }
    
    // Nest validation results under validation result key
    return { [config.validationResultKey]: validationResult };
  } catch (err) {
    logs.errorValidateAddress(err as Error);
    throw err;
  }
}