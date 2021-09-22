import { logger } from './logger';

export const obfuscateConfig = (config: any) => {
  return {
    ...config,
    shipEngineApiKey: '<omitted>',
  };
};

export const init = (config: any) => {
  logger.log({
    message: 'Initializing extension with configuration',
    options: {
      verbose: true,
    },
    config: obfuscateConfig(config),
  });
};

export const initError = (error: Error) => {
  logger.error({
    message: 'Error when initializing extension',
    error,
  });
};

export const start = (data: any) => {
  logger.log({
    message: 'Started extension execution',
    data,
  });
};

export const parentUpdating = (update: any) => {
  logger.debug({
    message: 'Parent ref updating',
    update,
  });
};

export const parentUpdated = () => {
  logger.debug({
    message: 'Parent ref updated',
  });
};

export const errorUpdatingParent = (error: Error) => {
  logger.error({
    message: 'Error updating parent',
    error,
  });
};

export const complete = () => {
  logger.info({
    message: 'Completed execution of extension',
  });
};
