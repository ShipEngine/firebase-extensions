import { logger } from 'firebase-functions';
import { empty as isEmpty } from 'is_js';
import { logs } from 'shipengine-firebase-common/src';

import config from './config';
import { RequestPayload, ValidatedAddress } from './types';

export const obfuscatedConfig = {
  ...config,
  shipengineApiKey: '<omitted>',
};

export default {
  ...logs,
  addressValidating: (params: RequestPayload) => {
    logger.debug('Validating address');
  },
  
  addressValidated: (validatedAddress: ValidatedAddress) => {
    const hasWarning = validatedAddress.status === 'warning';
    const level = hasWarning ? 'warn' : 'info';
  
    // Log any warning messages if they exist
    const msg: any[] = [`Validated address${hasWarning ? ' with warnings' : ''}`];
    if (hasWarning && isEmpty(validatedAddress.messages))
      msg.push(validatedAddress.messages);
  
    logger[level](...msg.flat());
  },
  errorValidateAddress: (error: Error) => {
    logger.error('Error when validating address.', error);
  },
}
