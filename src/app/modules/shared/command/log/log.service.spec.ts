import { TestBed } from '@angular/core/testing';
import { LogStrategyService } from './log.service';
import { LoggerStrategy } from '@shared/core/patterns/strategy';

describe('LogStrategyService', () => {
  let service: LogStrategyService;
  let mockLoggerStrategy: jasmine.SpyObj<LoggerStrategy>;

  beforeEach(() => {
    mockLoggerStrategy = jasmine.createSpyObj('LoggerStrategy', ['write']);

    TestBed.configureTestingModule({
      providers: [LogStrategyService],
    });

    service = TestBed.inject(LogStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use ConsoleLogStrategy by default', () => {
    const defaultService = new LogStrategyService();
    const spy = spyOn(defaultService['logStrategy'], 'write');

    defaultService.write({ indetity: 'test', message: 'test message' });

    expect(spy).toHaveBeenCalledWith('test', 'test message');
  });

  it('should use case setLogger', () => {
    service.setLogger(mockLoggerStrategy);

    service.write({ indetity: 'test', message: 'test message' });

    expect(mockLoggerStrategy.write).toHaveBeenCalledWith('test', 'test message');
  });
});
