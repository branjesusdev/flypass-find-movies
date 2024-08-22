import { RuntimeFormatPipe } from './runtime-format.pipe';

describe('RuntimeFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new RuntimeFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return 0h 0m', () => {
    const pipe = new RuntimeFormatPipe();
    expect(pipe.transform(0)).toBe('0h 0m');
  });

  it('should return 1h 0m', () => {
    const pipe = new RuntimeFormatPipe();
    expect(pipe.transform(60)).toBe('1h 0m');
  });
});
