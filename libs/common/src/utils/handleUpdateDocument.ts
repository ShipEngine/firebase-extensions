import { DocumentSnapshot } from 'firebase-functions/v1/firestore';
import * as logs from '../logs';

export const handleUpdateDocument = async <T>(
  snapshot: DocumentSnapshot,
  update: T
): Promise<void> => {
  logs.parentUpdating(update);

  try {
    await snapshot.ref.update(update);
    logs.parentUpdated();
  } catch (err) {
    logs.errorUpdatingParent(err as Error);
    throw err;
  }
};
