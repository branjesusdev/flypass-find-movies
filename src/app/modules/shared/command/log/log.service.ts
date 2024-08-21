import { Injectable } from '@angular/core'
import { LoggerStrategy } from '@shared/core/patterns/strategy'
import { ConsoleLogStrategy } from '@shared/core/entry-point/ConsoleLogStrategy.class'

@Injectable({
  providedIn: 'root'
})
export class LogStrategyService {
  private logStrategy: LoggerStrategy

  constructor () {
    this.logStrategy = new ConsoleLogStrategy()
  }

  setLogger (strategy: LoggerStrategy): void {
    this.logStrategy = strategy
  }

  write ({ indetity, message }: { indetity: string, message: string | object }): void {
    this.logStrategy.write(indetity, message)
  }
}
