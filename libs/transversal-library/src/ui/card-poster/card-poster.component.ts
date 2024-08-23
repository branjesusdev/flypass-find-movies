import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-card-poster',
  standalone: true,
  imports: [DecimalPipe, NgOptimizedImage],
  templateUrl: './card-poster.component.html',
  styleUrl: './card-poster.component.scss',
})
export class CardPosterComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) img!: string;
  @Input({ required: true }) vote!: string | number;
}
