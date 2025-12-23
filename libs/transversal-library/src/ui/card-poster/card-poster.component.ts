import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input, signal } from '@angular/core';
import { blurFade } from '../../animations/blur-fade.animation';

@Component({
  selector: 'ui-card-poster',
  imports: [DecimalPipe, NgOptimizedImage],
  templateUrl: './card-poster.component.html',
  styleUrl: './card-poster.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [blurFade],
})
export class CardPosterComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) img!: string;
  @Input({ required: true }) vote!: string | number;
  @Input({ required: false }) isPriority: boolean = false;
  viewTransitionId = input<string>('');

  loadedPoster = signal<boolean>(false);
}
