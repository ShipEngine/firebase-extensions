import * as functions from 'firebase-functions';
import { Change } from 'firebase-functions';
import ShipEngine from 'shipengine';
import {
  handleUpdateDocument,
  mapDataToSchema,
} from 'shipengine-firebase-common';
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore';

import {
  InputPayload,
  ParamSchema,
  RequestPayload,
  ResponsePayload,
  UpdatePayload,
} from './types';
import config from './config';
import logs from './logs';

// Initialize ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init(config);

export const validateAddress = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    try {
      const inputSchema: ParamSchema = JSON.parse(config.inputSchema);
      const data: DocumentData = change.after.data() || {};

      // Address validation already complete
      if (hasValidationData(data)) return;

      logs.start(data);

      // Validate Single Address
      const params: RequestPayload = new Array(
        mapDataToSchema(data, inputSchema)
      );
      const update = await handleValidateAddress(params);

      // Update the parent document with the address validation results
      handleUpdateDocument(change.after, update);
    } catch (err) {
      // Update the document with error information on failure
      if ((err as Error).message) {
        handleUpdateDocument(change.after, {
          [config.validationKey]: {
            errors: (err as Error).message,
          },
        });
      }
    }

    logs.complete();

    return;
  }
);

const hasValidationData = (data: InputPayload) => {
  return data['validation'] !== undefined;
};

const handleValidateAddress = async (
  params: RequestPayload
): Promise<UpdatePayload> => {
  logs.addressValidating(params);

  try {
    // fetch validated address and return first result in array
    const [result] = (await shipEngine.validateAddresses(
      params
    )) as ResponsePayload;
    logs.addressValidated(result);
    // Nest validation results under validation result key
    return { [config.validationKey]: result };
  } catch (err) {
    logs.errorValidatingAddress(err as Error);
    throw err;
  }
};
