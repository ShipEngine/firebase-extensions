import ShipEngine from 'shipengine';
import * as functions from 'firebase-functions';
import { Change } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { camelizeKeys } from 'humps';

import { handleUpdateDocument } from 'shipengine-firebase-common';
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

export const trackLabel = functions.handler.firestore.document.onWrite(
  async (change: Change<DocumentSnapshot>): Promise<void> => {
    if (!change.after.exists) return; // The document is being deleted

    let data = change.after.data() as InputPayload;

    // Support situations where the keys may be snake_cased
    data = camelizeKeys(data) as InputPayload;

    if (hasTrackingData(data)) return; // Tracking data exists

    logs.start(data);

    // Build the request payload and execute the label purchase
    const params = formatRequestPayload(data);
    const update = await handleGetLabelTrackingUpdate(params);

    // Update the parent document with the tracking result
    handleUpdateDocument(change.after, update);

    logs.complete();

    return;
  }
);

const hasTrackingData = (data: InputPayload) => {
  return data[config.trackingResultKey] !== undefined;
};

// const shouldUseLabelId = (data: InputPayload) => {
//   return data[config.labelIdKey] === undefined;
// };

const formatRequestPayload = (data: InputPayload): RequestPayload => {
  const label = data[config.labelKey];
  // format input payload to fit request payload
  return {
    trackingNumber: label[config.trackingNumberKey],
    carrierCode: label[config.carrierCodeKey],
  };
};

const handleGetLabelTrackingUpdate = async (
  params: RequestPayload
): Promise<UpdatePayload> => {
  logs.fetchingLabelTrackingData(params);
  try {
    const result = (await shipEngine.trackUsingCarrierCodeAndTrackingNumber(
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
