import { DocumentSnapshot } from 'firebase-functions/v1/firestore';
import * as logs from './logs';

export const handleUpdateDocument = <T>(
  snapshot: DocumentSnapshot,
  update: T
): void => {
  logs.parentUpdating(update);

  try {
    snapshot.ref.update(update);
    logs.parentUpdated();
  } catch (err) {
    logs.errorUpdatingParent(err as Error);
    throw err;
  }
};
