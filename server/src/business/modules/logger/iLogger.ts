export interface ILogger {
  stream: any

  log (log: any, context?: any, level?: string): void
  error (log: any, context?: any): void
  warn (log: any, context?: any): void
  info (log: any, context?: any): void
  debug (log: any, context?: any): void
  notice (log: any, context?: any): void
  crit (log: any, context?: any): void
  alert (log: any, context?: any): void
  emerg (log: any, context?: any): void
}
