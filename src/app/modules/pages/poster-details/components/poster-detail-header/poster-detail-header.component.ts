import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { DetailPoster } from '@shared/core/domain/entity';
import { RuntimeFormatPipe } from '@shared/pipes/runtime-format.pipe';

@Component({
  selector: 'app-poster-detail-header',
  standalone: true,
  imports: [CommonModule, RuntimeFormatPipe],
  templateUrl: './poster-detail-header.component.html',
  styleUrl: './poster-detail-header.component.scss',
})
export class PosterDetailHeaderComponent {
  @Input({ required: true }) posterHeader!: DetailPoster;
}
