import ShipEngine from 'shipengine';
import * as functions from "firebase-functions";
import { Change } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'
import { camelizeKeys } from 'humps';

import { RequestPayload, ResponsePayload, InputPayload, UpdatePayload } from './types';
import config from './config';
import * as logs from './logs';

// Initialize the ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init();

export const purchaseLabel = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    if (!change.after.exists) return; // The document is being deleted

    let data = change.after.data() as {};

    // Support situations where the keys may be snake_cased
    data = camelizeKeys(data) as InputPayload;

    if (hasValidLabel(data)) return; // A valid label has already been created

    logs.start(data);

    // Build the request payload and execute the label purchase
    const params = castParams(data);
    const update = await handlePurchaseLabel(params);

    // Update the parent document with the label data
    handleUpdateDocument(change.after, update);

    logs.complete();

    return;
  }
);

const hasValidLabel = (data: InputPayload): boolean => {
  return data[config.outputKey] !== undefined && data[config.outputKey].errors === undefined;
}

const castParams = (data: InputPayload): RequestPayload => {
  return { shipment: data[config.inputKey] };
}

const handlePurchaseLabel = async (params: RequestPayload): Promise<UpdatePayload> => {
  logs.purchasingLabel(params);

  try {
    const result: ResponsePayload = await shipEngine.createLabelFromShipmentDetails(params) as ResponsePayload;
    logs.labelPurchased(result);
    return { [config.outputKey]: result };
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