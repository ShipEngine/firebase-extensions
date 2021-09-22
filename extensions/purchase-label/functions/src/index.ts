import ShipEngine from 'shipengine';
import * as functions from 'firebase-functions';
import { Change } from 'firebase-functions';
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore';
import { handleUpdateDocument } from 'shipengine-firebase-common';

import {
  ParamSchema,
  RequestPayload,
  ResponsePayload,
  UpdatePayload,
} from './types';
import config from './config';
import * as converters from './converters';
import logs from './logs';

// Initialize the ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init(config);

export const purchaseLabel = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    try {
      const inputSchema: ParamSchema = JSON.parse(config.inputSchema);
      const data: DocumentData = change.after.data() || {};

      if (hasValidLabel(data)) return; // A valid label has already been created

      logs.start(data);

      // Build the request payload and execute the label purchase
      const params: RequestPayload = mapDataToSchema(data, inputSchema);
      console.log(params)
      const update = await handlePurchaseLabel(params);

      // Update the parent document with the label data
      handleUpdateDocument(change.after, update);
    } catch (err) {
      // Update the document with error information on failure
      if ((err as Error).message) handleUpdateDocument(change.after, { error: (err as Error).message });
    }

    logs.complete();

    return;
  }
);

const mapDataToSchema = (data: DocumentData, schema: ParamSchema) => {
  logs.mappingData(data, schema);

  try {
    return converters.mapDataToSchema(data, schema);
  } catch (err) {
    console.error(err);
    logs.errorMappingData(err as Error);
    throw err;
  }
};

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
    const result: ResponsePayload =
      (await shipEngine.createLabelFromShipmentDetails(
        params
      )) as ResponsePayload;
    logs.labelPurchased(result);
    return { [config.shippingLabelKey]: result };
  } catch (err) {
    logs.errorPurchasingLabel(err as Error);
    throw err;
  }
};