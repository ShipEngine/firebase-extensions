import ShipEngine from 'shipengine';
import * as functions from 'firebase-functions';
import { Change } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import {
  handleUpdateDocument,
  hasInputChanged,
} from 'shipengine-firebase-common';

import {
  RequestPayload,
  ResponsePayload,
  InputPayload,
  UpdatePayload,
} from './types';
import config from './config';
import logs from './logs';

// Initialize ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init(config);

export const getRates = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    if (hasInputChanged(change, castParams)) {
      let data = change.after.data() as InputPayload;

      logs.start(data);

      // Build the request payload and execute the label purchase
      const params = castParams(data);
      const update = await handleGetRates(params);

      // Update the parent document with the rates result
      handleUpdateDocument(change.after, update);

      logs.complete();
    }

    return;
  }
);

const castParams = (data: InputPayload): RequestPayload => {
  // Include carrier ids from config
  return {
    shipment: data[config.shipmentKey] as RequestPayload['shipment'],
    rateOptions: {
      carrierIds: config.carrierIds,
    } as RequestPayload['rateOptions'],
  };
};

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
