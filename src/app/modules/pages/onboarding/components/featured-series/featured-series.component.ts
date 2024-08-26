import { Component, effect, EventEmitter, Input, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, ItemsCarousel } from '@lib-transversal';
import { FeaturedSerie } from '@shared/core/domain/entity';

@Component({
  selector: 'app-featured-series',
  templateUrl: './featured-series.component.html',
  standalone: true,
  imports: [CarouselComponent],
  styleUrl: './featured-series.component.scss',
})
export class FeaturedSeriesComponent {
  @Input({ required: true }) set featuredSeries(series: FeaturedSerie[]) {
    const seriesMap = series.map(
      (serie) =>
        ({
          id: serie.id_serie,
          title: serie.title,
          poster_path: serie.poster_path,
          vote_average: serie.vote_average,
          overview: serie.overview,
          media_type: serie.media_type,
        }) as ItemsCarousel,
    );

    this.posters.set(seriesMap);
  }

  posters = signal<ItemsCarousel[]>([]);

  @Output() moreSeries = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  onPoster(poster: ItemsCarousel): void {
    this.router.navigate(['poster-detail', poster.media_type, poster.id]);
  }

  onReachEnd(reachEnd: boolean): void {
    if (!reachEnd) return;

    this.moreSeries.emit(true);
  }
}
