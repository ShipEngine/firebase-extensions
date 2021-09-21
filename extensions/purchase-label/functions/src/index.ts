import ShipEngine from 'shipengine';
import * as functions from "firebase-functions";
import { Change } from 'firebase-functions';
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore';

import { ParamSchema, RequestPayload, ResponsePayload, UpdatePayload } from './types';
import config from './config';
import * as converters from './converters';
import * as logs from './logs';

// Initialize the ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init();

export const purchaseLabel = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    if (!change.after.exists) return; // The document is being deleted

    const inputSchema: ParamSchema = JSON.parse(config.inputSchema);
    const data: DocumentData = change.after.data() || {};
    const params: RequestPayload = converters.mapDataToSchema(data, inputSchema);

    if (hasValidLabel(data)) return; // A valid label has already been created

    logs.start(data);

    try {
      // Build the request payload and execute the label purchase
      const update = await handlePurchaseLabel(params);

      // Update the parent document with the label data
      handleUpdateDocument(change.after, update);
    } catch (err) {
      // Update the document with error information on failure
      handleUpdateDocument(change.after, { error: err })
    }

    logs.complete();

    return;
  }
);

const hasValidLabel = (data: DocumentData): boolean => {
  return data[config.shippingLabelKey] !== undefined && data[config.shippingLabelKey].errors === undefined;
}

const handlePurchaseLabel = async (params: RequestPayload): Promise<UpdatePayload> => {
  logs.purchasingLabel(params);

  try {
    const result: ResponsePayload = await shipEngine.createLabelFromShipmentDetails(params) as ResponsePayload;
    logs.labelPurchased(result);
    return { [config.shippingLabelKey]: result };
  } catch (err) {
    logs.errorPurchasingLabel(err as Error);
    throw err;
  }
};

const handleUpdateDocument = (after: DocumentSnapshot, update: UpdatePayload): void => {
  logs.parentUpdating(update);

  try {
    after.ref.update(update);
    logs.parentUpdated();
  } catch (err) {
    logs.errorUpdatingParent(err as Error);
    throw err;
  }
};