import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-snippet',
  standalone: true,
  imports: [NgOptimizedImage, DatePipe],
  templateUrl: './snippet.component.html',
  styleUrl: './snippet.component.scss',
})
export class SnippetComponent {
  @Input()
  title = '';

  @Input()
  image = '';

  @Input()
  releaseDate = '';

  @Input()
  overview = '';

  @Input()
  eventEmmit: any;

  @Output()
  handleEvent = new EventEmitter<any>();
}
