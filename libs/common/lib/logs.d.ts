import { DocumentData } from '@google-cloud/firestore';
export declare const obfuscateConfig: (config: any) => any;
export declare const init: (config: any) => void;
export declare const initError: (error: Error) => void;
export declare const start: (data: any) => void;
export declare const parentUpdating: (update: any) => void;
export declare const parentUpdated: () => void;
export declare const errorUpdatingParent: (error: Error) => void;
export declare const complete: () => void;
export declare const mappingData: (data: DocumentData, schema: any) => void;
export declare const errorMappingData: (error: Error) => void;
//# sourceMappingURL=logs.d.ts.map