import { SessionStorage } from './SessionStorage.class';

describe('SessionStorage', () => {
  let sessionStorageMock: jasmine.SpyObj<Storage>;
  let service: SessionStorage;

  beforeEach(() => {
    sessionStorageMock = jasmine.createSpyObj('sessionStorage', [
      'getItem',
      'setItem',
      'removeItem',
    ]);
    service = new SessionStorage();
    spyOnProperty(window, 'sessionStorage').and.returnValue(sessionStorageMock);
  });

  it('should get an item from sessionStorage', () => {
    const key = 'testKey';
    const value = 'testValue';
    sessionStorageMock.getItem.and.returnValue(value);

    const result = service.get<string>(key);

    expect(sessionStorageMock.getItem).toHaveBeenCalledWith(key);
    expect(result).toBe(value);
  });

  it('should set an item in sessionStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    const result = service.set(key, value);

    expect(sessionStorageMock.setItem).toHaveBeenCalledWith(key, value);
    expect(result).toBeTrue();
  });

  it('should update an item in sessionStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    const result = service.update(key, value);

    expect(sessionStorageMock.setItem).toHaveBeenCalledWith(key, value);
    expect(result).toBeTrue();
  });

  it('should remove an item from sessionStorage', () => {
    const key = 'testKey';

    service.remove(key);

    expect(sessionStorageMock.removeItem).toHaveBeenCalledWith(key);
  });

  it('should return false if setItem throws an error', () => {
    const key = 'testKey';
    const value = 'testValue';
    sessionStorageMock.setItem.and.throwError('Error');

    const result = service.set(key, value);

    expect(result).toBeFalse();
  });

  it('should return false if updateItem throws an error', () => {
    const key = 'testKey';
    const value = 'testValue';
    sessionStorageMock.setItem.and.throwError('Error');

    const result = service.update(key, value);

    expect(result).toBeFalse();
  });
});
