import ShipEngine from 'shipengine';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { camelizeKeys } from 'humps';

// Utils
import logs from './logs';
import { mapDataToSchema } from 'shipengine-firebase-common-lib';

// Types
import { RequestPayload, UpdatePayload } from './types';
import { TrackUsingCarrierCodeAndTrackingNumberTypes } from 'shipengine/esm/track-using-carrier-code-and-tracking-number';

import config from './config';

export type ParamSchema = { [key: string]: any };

// Initialize ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init(config);

admin.initializeApp();

/**
 * __Tracking Update Webhook Handler__
 */
export const trackingWebhook = functions.handler.https.onRequest(
  async (req, res) => {
    if (!isValidShipEngineRequest(req)) {
      // Invalid Request
      res.sendStatus(400).end();
    }
    try {
      // convert case to match ShipEngine SDK
      const trackingUpdate = camelizeKeys(
        req.body.data
      ) as any as TrackUsingCarrierCodeAndTrackingNumberTypes.Result;

      // Map tracking update to Output Schema before saving document
      const outputSchema: ParamSchema = JSON.parse(config.outputSchema);

      const update = mapDataToSchema(trackingUpdate, outputSchema);

      // Update tracking data in firestore
      await handleCreateOrUpdateDocument(update, 'trackingNumber');

      res.sendStatus(200).end();
    } catch (error) {
      res.sendStatus(500).end();
      throw error;
    }
  }
);

/**
 * Check if webhook request is valid.
 *
 * https://www.shipengine.com/docs/tracking/webhooks/#validation
 */
const isValidShipEngineRequest = (req: functions.Request): boolean => {
  const validUserAgent = 'ShipEngine/v1';
  return req.headers['user-agent'] === validUserAgent;
};

/**
 * Return tracking data for a specified label_id or trackingNumber/carrierCode
 */
export const trackLabel = functions.handler.https.onCall(
  async (data, context) => {
    // only allow authenticated access via firebase sdk
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'This function requires authentication.'
      );
    }

    try {
      //TODO stringify data for clearer logs.
      // logs.start(data);

      const inputSchema: ParamSchema = JSON.parse(config.inputSchema);
      const outputSchema = JSON.parse(config.outputSchema);

      const params: RequestPayload = mapDataToSchema(data, inputSchema);
      const trackingData: UpdatePayload = await handleGetTrackingData(params);

      // Handle no tracking data error and remove !
      const update = mapDataToSchema(trackingData!, outputSchema);

      // Store tracking data
      await handleCreateOrUpdateDocument(update, 'trackingNumber');

      return update;
    } catch (error) {
      // Return errors without storing data since tracking number may not be present
      return error;
    }
  }
);

const handleGetTrackingData = async (
  params: RequestPayload
): Promise<UpdatePayload> => {
  // logs.fetchingTrackingData(params);
  let trackingData;
  try {
    if (params?.['labelId'] !== undefined) {
      // fetch tracking data by labelId
      trackingData = (await shipEngine.trackUsingLabelId(
        params.labelId!
      )) as UpdatePayload;

      // save the label id
      trackingData.labelId = params.labelId;
    } else if (params?.carrierCode && params?.trackingNumber) {
      // fetch tracking data by carrierCode and trackingNumber
      const { trackingNumber, carrierCode } = params;
      trackingData = (await shipEngine.trackUsingCarrierCodeAndTrackingNumber({
        carrierCode,
        trackingNumber,
      })) as UpdatePayload;
    } else {
      trackingData = {} as UpdatePayload;
    }
  } catch (error) {
    throw error;
  }
  // logs.trackingDataFetched(result);
  return trackingData as UpdatePayload;
};

const handleCreateOrUpdateDocument = async (data: any, key: string) => {
  if (!data[key]) return Promise.resolve();

  await admin
    .firestore()
    .collection(config.collectionPath)
    .doc(data[key])
    .set(data, { merge: true });
};
