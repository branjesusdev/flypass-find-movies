import { Component, Input as ResolvedData } from '@angular/core';
import { PosterDetailHeaderComponent } from '../poster-detail-header/poster-detail-header.component';
import { PosterDetailContentComponent } from '../poster-detail-content/poster-detail-content.component';
import { DetailPoster } from '@shared/core/domain/entity';

@Component({
  selector: 'app-poster-detail-master',
  standalone: true,
  imports: [PosterDetailHeaderComponent, PosterDetailContentComponent],
  templateUrl: './poster-detail-master.component.html',
  styleUrl: './poster-detail-master.component.scss',
})
export default class PosterDetailMasterComponent {
  @ResolvedData() posterDetail!: DetailPoster | null;

  constructor() {}
}
