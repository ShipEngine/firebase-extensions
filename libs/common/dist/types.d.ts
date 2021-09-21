export declare type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
export interface LogEntry {
  options?: LogOptions;
  message?: string;
  [x: string]: any;
}
export declare type LogSeverity =
  | 'DEBUG'
  | 'INFO'
  | 'NOTICE'
  | 'WARNING'
  | 'ERROR'
  | 'CRITICAL'
  | 'ALERT'
  | 'EMERGENCY';
export declare type LogOptions = {
  verbose?: boolean;
};
//# sourceMappingURL=types.d.ts.map
