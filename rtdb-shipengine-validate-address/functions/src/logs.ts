import { logger } from 'firebase-functions';
import config from './config';
import { AddressValidationResult } from './types';
import { empty as isEmpty } from 'is_js';
import { dependencyInitError } from './utils';

export const obfuscatedConfig = {
  ...config,
  shipengineApiKey: '<omitted>',
};

/**
 * Extension Lifecycle
 *
 * - init
 *  - initError
 * - dependencyInitError
 * - start
 * - doThing
 *   - thingDoing
 *   - thingDid
 *   - errorDoThing
 * - complete
 */
export const init = () => {
  logger.log(`Initializing extension with configuration: `, config);
};
export const initError = (error: Error) => {
  logger.error('Error when initializing extension');
};
export const shipengineInitError = dependencyInitError('ShipEngine');
export const start = () => {
  logger.log('Started extension execution with configuration', config);
};
export const parentRefernceError = () => {
  logger.error(`Address key is missing parent object`);
};
export const addressValidating = () => {
  logger.debug('Validating address');
};
export const addressValidated = (
  status: string,
  messages?: AddressValidationResult['messages']
) => {
  const hasWarning = status === 'warning';
  const level = hasWarning ? 'warn' : 'info';
  // Log any warning messages if they exist
  const msg: any[] = [`Validated address${hasWarning ? ' with warnings' : ''}`];
  if (hasWarning && isEmpty(messages)) msg.push(messages);
  logger[level](...msg.flat());
};

export const errorValidateAddress = (error: Error) => {
  logger.error('Error when validating address.', error);
};
export const parentUpdating = () => {
  logger.debug('Parent ref updating');
};
export const parentUpdated = () => {
  logger.debug('Parent ref updated');
};
export const errorUpdateParent = (error: Error) => {
  logger.error('Error updating parent', error);
};
export const complete = () => {
  logger.info('Completed execution of extension');
};
