import { logger } from 'firebase-functions';
import { RequestPayload, ResponsePayload, InputPayload, UpdatePayload } from './types';

import config from './config';

export const obfuscatedConfig = {
  ...config,
  shipengineApiKey: '<omitted>',
};

export const init = () => {
  logger.log('Initializing extension with configuration: ', obfuscatedConfig);
};

export const start = (data: InputPayload) => {
  logger.log('Started extension execution with data: ', data);
};

export const purchasingLabel = (params: RequestPayload) => {
  logger.log('Purchasing label with params: ', params);
};

export const errorPurchasingLabel = (error: Error) => {
  logger.error('Error purchasing label: ', error);
};

export const labelPurchased = (result: ResponsePayload) => {
  logger.log('Successfully purchased label: ', result);
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
