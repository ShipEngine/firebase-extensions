import ShipEngine from 'shipengine';
import * as functions from "firebase-functions";
import { Change } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { camelizeKeys } from "humps";

import { RequestPayload, ResponsePayload, InputPayload, UpdatePayload } from './types';
import config from './config';
import * as logs from './logs';

// Initialize ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init();

export const getRates = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    if (!change.after.exists) return; // The document is being deleted

    let data = change.after.data() as InputPayload;

    // Support situations where the keys may be snake_cased
    data = camelizeKeys(data) as InputPayload;
    
    logs.start(data);

    // Build the request payload and execute the label purchase
    const params = castParams(data)
    const update = await handleGetRates(params);

    // Update the parent document with the rates result
    handleUpdateDocument(change.after, update);

    logs.complete();

    return;
  }
)

const castParams = (data: InputPayload): RequestPayload => {
  // Include carrier ids from config
  return {
    shipment: data[config.shipmentKey] as RequestPayload['shipment'],
    rateOptions: {
      carrierIds: config.carrierIds
    } as RequestPayload['rateOptions']
  }
}

const handleGetRates = async (params: RequestPayload): Promise<UpdatePayload> => {
  logs.fetchingRates(params);
  try {  
    const result = await shipEngine.getRatesWithShipmentDetails(params) as ResponsePayload;
    logs.ratesFetched(result);
    return { [config.ratesKey]: result };
  } catch (error) {
    logs.errorFetchRates(error as Error);
    throw error;
  }
}

const handleUpdateDocument = (after: DocumentSnapshot, update: UpdatePayload): void => {
  logs.parentUpdating(update);
  
  try {
    after.ref.update(update);
    logs.parentUpdated()
  } catch (err) {
    logs.errorUpdatingParent(err as Error);
    throw err;
  }
}
