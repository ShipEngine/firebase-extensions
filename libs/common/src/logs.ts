import { logger } from 'firebase-functions';

export const obfuscateConfig = (config: any) => {
  return {
    ...config,
    shipEngineApiKey: '<omitted>',
  };
};

export const init = (config: any) => {
  logger.log(
    'Initializing extension with configuration:',
    obfuscateConfig(config)
  );
};

export const initError = (error: Error) => {
  logger.error('Error when initializing extension.');
};

export const start = (data: any) => {
  logger.log('Started extension execution: ', data);
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
