import { logger } from 'firebase-functions';
import { logs } from 'shipengine-firebase-common';
import { RequestPayload, ResponsePayload } from './types';

export default {
  ...logs,
  fetchingRates: (params: RequestPayload) => {
    logger.debug('Fetching Rates', params);
  },
  
  ratesFetched: (result: ResponsePayload) => {
    logger.log('Successfully fetched rates', result);
  },
  
  errorFetchRates: (error: Error) => {
    logger.error('Error when fetching rates.', error);
  },
}
