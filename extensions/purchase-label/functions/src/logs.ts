import { logs, logger } from 'shipengine-firebase-common';
import { DocumentData } from '@google-cloud/firestore';
import { RequestPayload, ResponsePayload, ParamSchema } from './types';

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
  mappingData: (data: DocumentData, schema: ParamSchema) => {
    logger.log({
      message: 'Mapping data with schema',
      data,
      schema,
    });
  },

  errorMappingData: (error: Error) => {
    logger.log({
      message: 'error mapping data with schema',
      error,
    });
  },
};
