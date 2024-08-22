import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DetailPoster } from '@shared/core/domain/entity';

@Component({
  selector: 'app-poster-detail-content',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './poster-detail-content.component.html',
  styleUrl: './poster-detail-content.component.scss',
})
export class PosterDetailContentComponent {
  @Input({ required: true }) posterContent!: DetailPoster;
}
