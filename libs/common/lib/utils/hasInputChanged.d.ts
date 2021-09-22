import { Change } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
export declare const hasInputChanged: (
  change: Change<DocumentSnapshot>,
  castFn: (data: any) => any
) => boolean;
//# sourceMappingURL=hasInputChanged.d.ts.map
