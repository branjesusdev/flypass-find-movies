export interface LoggerStrategy {
  write(indetity: string, message: string | object): void
}
