import { logger } from 'firebase-functions';
import { empty as isEmpty } from 'is_js';

import config from './config';
import { InputPayload, RequestPayload, ValidatedAddress } from './types';

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
  logger.log('Started extension execution with configuration', data);
};

export const addressValidating = (params: RequestPayload) => {
  logger.debug('Validating address');
};

export const addressValidated = (validatedAddress: ValidatedAddress) => {
  const hasWarning = validatedAddress.status === 'warning';
  const level = hasWarning ? 'warn' : 'info';

  // Log any warning messages if they exist
  const msg: any[] = [`Validated address${hasWarning ? ' with warnings' : ''}`];
  if (hasWarning && isEmpty(validatedAddress.messages))
    msg.push(validatedAddress.messages);

  logger[level](...msg.flat());
};

export const errorValidateAddress = (error: Error) => {
  logger.error('Error when validating address.', error);
};

export const parentUpdating = <T>(update: T) => {
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
