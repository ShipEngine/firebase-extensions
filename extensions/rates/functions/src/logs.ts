import { logger } from 'firebase-functions';
// import { empty as isEmpty } from 'is_js';

import config from './config';
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

export const start = () => {
  logger.log('Started extension execution with configuration', obfuscatedConfig);
};

export const shipmentMissing = () => {
  logger.error(`Shipment data missing`);
};

export const fetchingRates = () => {
  logger.debug('Fetching Rates');
};

export const ratesFetched = () => {
  // const hasWarning = validatedAddress.status === 'warning';
  // const level = hasWarning ? 'warn' : 'info';

  // // Log any warning messages if they exist
  // const msg: any[] = [`Validated address${hasWarning ? ' with warnings' : ''}`];
  // if (hasWarning && isEmpty(validatedAddress.messages)) msg.push(validatedAddress.messages);

  // logger[level](...msg.flat());
};

export const errorFetchRates = (error: Error) => {
  logger.error('Error when fetching rates.', error);
};

export const parentUpdating = () => {
  logger.debug('Parent ref updating');
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
