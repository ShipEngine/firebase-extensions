import { logs, logger } from 'shipengine-firebase-common-lib';
import { RequestPayload, ResponsePayload } from './types';

export default {
  ...logs,
  fetchingRates: (params: RequestPayload) => {
    logger.debug({
      message: 'Fetching Rates',
      params,
    });
  },

  ratesFetched: (result: ResponsePayload) => {
    logger.log({
      message: 'Successfully fetched rates',
      result,
    });
  },

  errorFetchRates: (error: Error) => {
    logger.error({
      message: 'Error when fetching rates.',
      error,
    });
  },
};
