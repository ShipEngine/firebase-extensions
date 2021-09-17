import { logger } from 'firebase-functions';
// import { empty as isEmpty } from 'is_js';

import config from './config';
import { InputPayload, RequestPayload, ResponsePayload, UpdatePayload } from './types';
// import { AddressValidationResult as ValidatedAddress } from './types';

export const obfuscatedConfig = {
  ...config,
  shipengineApiKey: '<omitted>',
};

export const init = () => {
  logger.log(`Initializing extension with configuration: `, obfuscatedConfig);
};

export const initError = (error: Error) => {
  logger.error('Error when initializing extension');
};

export const start = (data: InputPayload) => {
  logger.log('Started extension execution', data);
};

export const shipmentMissing = () => {
  logger.error(`Shipment data missing`);
};

export const fetchingRates = (params: RequestPayload) => {
  logger.debug('Fetching Rates', params);
};

export const ratesFetched = (result: ResponsePayload) => {
  logger.log('Successfully fetched rates', result);
};

export const errorFetchRates = (error: Error) => {
  logger.error('Error when fetching rates.', error);
};

export const parentUpdating = (update: any) => {
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
