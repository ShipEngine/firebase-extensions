import ShipEngine from 'shipengine';
import * as functions from 'firebase-functions';
import { Change } from 'firebase-functions';
import { DocumentSnapshot, DocumentData } from '@google-cloud/firestore';
import {
  handleUpdateDocument,
  hasInputChanged,
  mapDataToSchema,
} from 'shipengine-firebase-common-lib';

import { RequestPayload, ResponsePayload, UpdatePayload } from './types';
import config from './config';
import logs from './logs';

export type ParamSchema = { [key: string]: any };

// Initialize ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init(config);

export const trackLabel = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    const inputSchema: ParamSchema = JSON.parse(config.inputSchema);
    const castParams = (data: object) => mapDataToSchema(data, inputSchema);

    if (hasInputChanged(change, castParams)) {
      try {
        const data: DocumentData = change.after.data() || {};

        if (hasTrackingData(data)) return; // Tracking data already exists

        logs.start(data);

        // Build the request payload and execute the label purchase
        const params: RequestPayload = mapDataToSchema(data, inputSchema);
        const update = await handleGetLabelTrackingUpdate(params);

        // Update the parent document with the tracking result
        handleUpdateDocument(change.after, update);
      } catch (err) {
        // Update the document with error information on failure
        if ((err as Error).message) {
          handleUpdateDocument(change.after, {
            [config.trackingResultKey]: {
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

const hasTrackingData = (data: DocumentData): boolean => {
  return (
    data[config.trackingResultKey] !== undefined &&
    data[config.trackingResultKey].errors === undefined
  );
};

const handleGetLabelTrackingUpdate = async (
  params: RequestPayload
): Promise<UpdatePayload> => {
  logs.fetchingLabelTrackingData(params);

  try {
    const result: ResponsePayload =
      (await shipEngine.trackUsingCarrierCodeAndTrackingNumber(
        params
      )) as ResponsePayload;

    logs.labelTrackingDataFetched(result);
    return {
      [config.trackingResultKey]: result,
    };
  } catch (error) {
    logs.errorFetchLabelTrackingData(error as Error);
    throw error;
  }
};
