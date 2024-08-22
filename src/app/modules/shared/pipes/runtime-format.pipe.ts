import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtimeFormat',
  standalone: true,
})
export class RuntimeFormatPipe implements PipeTransform {
  transform(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 60);
    const minutes = totalSeconds % 60;

    return `${hours}h ${minutes}m`;
  }
}
