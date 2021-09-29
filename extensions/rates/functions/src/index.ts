import ShipEngine from 'shipengine';
import * as functions from 'firebase-functions';
import { Change } from 'firebase-functions';
import { DocumentSnapshot, DocumentData } from '@google-cloud/firestore';
import {
  handleUpdateDocument,
  hasInputChanged,
  mapDataToSchema,
} from 'shipengine-firebase-common-lib';

import {
  RequestPayload,
  ResponsePayload,
  UpdatePayload,
  ParamSchema,
} from './types';
import config from './config';
import logs from './logs';

// Initialize ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init(config);

export const getRates = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    const inputSchema: ParamSchema = JSON.parse(config.inputSchema);
    const castParams = (data: object) => mapDataToSchema(data, inputSchema);

    if (hasInputChanged(change, castParams)) {
      try {
        const data: DocumentData = change.after.data() || {};

        logs.start(data);

        // Build the request payload and execute the label purchase
        const params: RequestPayload = mapDataToSchema(data, inputSchema);
        params.rateOptions.carrierIds = [
          ...config.carrierIds,
        ] as RequestPayload['rateOptions']['carrierIds'];
        const update = await handleGetRates(params);

        // Update the parent document with the rates result
        handleUpdateDocument(change.after, update);
      } catch (err) {
        // Update the document with error information on failure
        if ((err as Error).message) {
          handleUpdateDocument(change.after, {
            [config.ratesKey]: {
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

const handleGetRates = async (
  params: RequestPayload
): Promise<UpdatePayload> => {
  logs.fetchingRates(params);
  try {
    const result = (await shipEngine.getRatesWithShipmentDetails(
      params
    )) as ResponsePayload;
    logs.ratesFetched(result);
    const rates = result.rateResponse.rates;
    return { [config.ratesKey]: rates };
  } catch (error) {
    logs.errorFetchRates(error as Error);
    throw error;
  }
};
