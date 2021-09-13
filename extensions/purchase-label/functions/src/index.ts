import ShipEngine from 'shipengine';
import * as functions from "firebase-functions";
import { Change } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

import { RequestPayload, ResponsePayload, InputPayload, UpdatePayload } from './types';
import config from './config';
import * as logs from './logs';

const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init();

export const purchaseLabel = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    const data = change.after.data() as InputPayload;

    logs.start(data);

    const params = castParams(data);
    const update = await handlePurchaseLabel(params);

    handleUpdateDocument(change.after, update);

    logs.complete();

    return;
  }
);

const castParams = (data: InputPayload): RequestPayload => {
  return { shipment: data[config.inputKey] };
}

const handlePurchaseLabel = async (params: RequestPayload): Promise<UpdatePayload> => {
  logs.purchasingLabel(params);

  try {
    const result: ResponsePayload = await shipEngine.createLabelFromShipmentDetails(params);
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