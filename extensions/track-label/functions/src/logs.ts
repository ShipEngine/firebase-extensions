import { logs } from 'shipengine-firebase-common';
import logger from 'shipengine-firebase-common/dist/logger';
import { RequestPayload, ResponsePayload } from './types';

export default {
  ...logs,
  fetchingLabelTrackingData: (params: RequestPayload) => {
    logger.debug({
      message: 'Fetching label tracking data.',
      params,
    });
  },

  labelTrackingDataFetched: (result: ResponsePayload) => {
    logger.log({
      message: 'Successfully fetched label tracking data.',
      result,
    });
  },

  errorFetchLabelTrackingData: (error: Error) => {
    logger.error({
      message: 'Error when fetching label tracking data.',
      error,
    });
  },
};
