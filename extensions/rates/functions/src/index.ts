import * as functions from "firebase-functions";
import ShipEngine, {  } from 'shipengine';

import config from './config';
import * as logs from './logs';
import { Params } from "./types";

interface InputPayload {
  [key: string]: any
}

// Initialize ShipEngine client
const shipEngine = new ShipEngine(config.shipEngineApiKey);

logs.init();

export const getRates = functions.handler.firestore.document.onWrite(
  async (change) => {
    logs.start();

    const data = change.after.data() as InputPayload;
    const params = data[config.inputKey] as Params;

    if (!params) {
      logs.shipmentMissing();
    }

    // const params: Params = shipment;

    let update: any;

    /**
     * Fetch Rates
     */
    try {
      logs.fetchingRates();
      
      const result = await shipEngine.getRatesWithShipmentDetails(params);
      update = { result };
    } catch (error) {
      logs.errorFetchRates(error as Error);
      return;
    }

    logs.ratesFetched([]); // remove args

    /**
     * Update Reference
     */
    try {
      logs.parentUpdating();
      change.after.ref.update(update);
      logs.parentUpdated()
    } catch (err) {
      logs.errorUpdatingParent(err as Error);
      return;
    }
  }
)