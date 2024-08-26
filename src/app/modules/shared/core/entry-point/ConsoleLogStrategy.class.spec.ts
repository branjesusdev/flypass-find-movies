import { TestBed } from '@angular/core/testing';
import { ConsoleLogStrategy } from './ConsoleLogStrategy.class';

describe('ConsoleLogStrategy', () => {
  it('should use ConsoleLogStrategy by write', () => {
    const consoleLogStrategy = new ConsoleLogStrategy();
    const spy = spyOn(console, 'log');

    consoleLogStrategy.write('test', 'test message');

    expect(spy).toHaveBeenCalledWith('test', 'test message');
  });
});
