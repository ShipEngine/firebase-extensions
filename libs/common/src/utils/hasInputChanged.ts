import { isEqual } from 'lodash';
import { Change } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export const hasInputChanged = (
  change: Change<DocumentSnapshot>,
  castFn: (data: any) => any
): boolean => {
  if (!change.before.exists) return true; // The document was just inserted
  if (!change.after.exists) return false; // The document is being deleted

  // The input has changed since the last update
  return !isEqual(castFn(change.after.data()), castFn(change.before.data()));
};
