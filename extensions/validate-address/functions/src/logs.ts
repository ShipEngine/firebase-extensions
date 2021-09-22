import { logs, logger } from 'shipengine-firebase-common';

import { RequestPayload, ValidatedAddress } from './types';

export default {
  ...logs,
  addressValidating: (params: RequestPayload) => {
    logger.debug({
      message: 'Validating address',
      params,
    });
  },
  addressValidated: (validatedAddress: ValidatedAddress) => {
    const hasWarning = validatedAddress.status === 'warning';
    const level = hasWarning ? 'warn' : 'info';

    // Log any warning messages if they exist
    const message = `Validated address${hasWarning ? ' with warnings' : ''}`;

    logger[level]({
      message,
      ...(hasWarning && { warnings: validatedAddress.messages }),
    });
  },
  errorValidateAddress: (error: Error) => {
    logger.error({
      message: 'Error when validating address.',
      error,
    });
  },
};
