import { logs, logger } from 'shipengine-firebase-common';
import { RequestPayload, ResponsePayload } from './types';

export default {
  ...logs,
  purchasingLabel: (params: RequestPayload) => {
    logger.log({
      message: 'Purchasing label',
      params,
    });
  },

  errorPurchasingLabel: (error: Error) => {
    logger.error({
      message: 'Error purchasing label',
      error,
    });
  },

  labelPurchased: (result: ResponsePayload) => {
    logger.log({
      message: 'Successfully purchased label',
      result,
    });
  },
};
