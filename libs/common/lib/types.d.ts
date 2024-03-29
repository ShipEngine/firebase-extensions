export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
export interface LogEntry {
  options?: LogOptions;
  message?: string;
  [x: string]: any;
}
export type LogSeverity =
  | 'DEBUG'
  | 'INFO'
  | 'NOTICE'
  | 'WARNING'
  | 'ERROR'
  | 'CRITICAL'
  | 'ALERT'
  | 'EMERGENCY';
export type LogOptions = {
  verbose?: boolean;
  maxArrayLength?: number;
};
//# sourceMappingURL=types.d.ts.map
