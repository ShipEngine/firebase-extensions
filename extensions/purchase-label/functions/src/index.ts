import ShipEngine from 'shipengine';
import * as functions from 'firebase-functions';
import { Change } from 'firebase-functions';
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore';
import {
  handleUpdateDocument,
  mapDataToSchema,
  hasInputChanged,
} from 'shipengine-firebase-common-lib';

import {
  ParamSchema,
  RequestPayload,
  ResponsePayload,
  UpdatePayload,
} from './types';
import config from './config';
import logs from './logs';

// Initialize the ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init(config);

export const purchaseLabel = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    const inputSchema: ParamSchema = JSON.parse(config.inputSchema);
    const castParams = (data: object) => mapDataToSchema(data, inputSchema);

    if (hasInputChanged(change, castParams)) {
      try {
        const data: DocumentData = change.after.data() || {};

        if (hasValidLabel(data)) return; // A valid label has already been created

        logs.start(data);

        // Build the request payload and execute the label purchase
        const params: RequestPayload = mapDataToSchema(data, inputSchema);
        const update = await handlePurchaseLabel(params);

        // Update the parent document with the label data
        handleUpdateDocument(change.after, update);
      } catch (err) {
        // Update the document with error information on failure
        if ((err as Error).message) {
          handleUpdateDocument(change.after, {
            [config.shippingLabelKey]: {
              errors: (err as Error).message,
            },
          });
        }
      }

      logs.complete();
    }

    return;
  }
);

const hasValidLabel = (data: DocumentData): boolean => {
  return (
    data[config.shippingLabelKey] !== undefined &&
    data[config.shippingLabelKey].errors === undefined
  );
};

const handlePurchaseLabel = async (
  params: RequestPayload
): Promise<UpdatePayload> => {
  logs.purchasingLabel(params);

  try {
    let result: ResponsePayload;

    if (params.rateId !== undefined) {
      result = await shipEngine.createLabelFromRate(params);
    } else {
      result = await shipEngine.createLabelFromShipmentDetails(params);
    }

    logs.labelPurchased(result);
    return { [config.shippingLabelKey]: result };
  } catch (err) {
    logs.errorPurchasingLabel(err as Error);
    throw err;
  }
};
