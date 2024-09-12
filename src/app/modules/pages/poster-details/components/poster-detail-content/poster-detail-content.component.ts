import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { BadgeComponent, blurFade } from '@lib-transversal';
import { DetailPoster } from '@shared/core/domain/entity';

@Component({
  selector: 'app-poster-detail-content',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, BadgeComponent],
  animations: [blurFade],
  templateUrl: './poster-detail-content.component.html',
  styleUrl: './poster-detail-content.component.scss',
})
export class PosterDetailContentComponent {
  loadedPoster = signal<boolean>(false);

  @Input({ required: true }) posterContent!: DetailPoster;
}
