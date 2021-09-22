import { logger } from 'firebase-functions';
import { DocumentData } from '@google-cloud/firestore';
import { RequestPayload, ResponsePayload, UpdatePayload, ParamSchema } from './types';

import config from './config';

export const obfuscatedConfig = {
  ...config,
  shipengineApiKey: '<omitted>',
};

export const init = () => {
  logger.log('Initializing extension', obfuscatedConfig);
};

export const start = (data: DocumentData) => {
  logger.log('Started extension execution', data);
};

export const mappingData = (data: DocumentData, schema: ParamSchema) => {
  logger.log('Mapping data with schema', data, schema);
};

export const errorMappingData = (error: Error) => {
  logger.log('error mapping data with schema', error);
}

export const purchasingLabel = (params: RequestPayload) => {
  logger.log('Purchasing label', params);
};

export const errorPurchasingLabel = (error: Error) => {
  logger.error('Error purchasing label', error);
};

export const labelPurchased = (result: ResponsePayload) => {
  logger.log('Successfully purchased label', result);
};

export const parentUpdating = (update: UpdatePayload) => {
  logger.debug('Parent ref updating', update);
};

export const parentUpdated = () => {
  logger.debug('Parent ref updated');
};

export const errorUpdatingParent = (error: Error) => {
  logger.error('Error updating parent', error);
};

export const complete = () => {
  logger.info('Completed execution of extension');
};
