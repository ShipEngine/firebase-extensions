import { logger } from 'firebase-functions';

export const dependencyInitError = (dependency: string) => () => {
  logger.error(
    `${dependency} was not initialized correctly, check for errors in the logs`
  );
};

export function assertUnreachable(_x: never): never {
  throw new Error("Didn't expect to get here");
}