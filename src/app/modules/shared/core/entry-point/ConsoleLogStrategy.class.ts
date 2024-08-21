import { LoggerStrategy } from '@shared/core/patterns/strategy'

export class ConsoleLogStrategy implements LoggerStrategy {
  write (indetity: string, message: string | object): void {
    console.log(indetity, message)
  }
}
