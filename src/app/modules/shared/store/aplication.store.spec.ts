import { TestBed } from '@angular/core/testing';
import { AplicationStore } from './aplication.store';

describe('AplicationStore', () => {
  let service: AplicationStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AplicationStore],
    });
    service = TestBed.inject(AplicationStore) as AplicationStore<any>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should saveState$', () => {
    service.saveState$({ key: 'test', info: 'test' });

    expect(service.getStateValue('test')).toBe('test');
  });

  it('should getState$', () => {
    service.saveState$({ key: 'test', info: 'test' });

    service.getState$('test').subscribe((state) => {
      expect(state).toBe('test');
    });
  });
});
