import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, ItemsCarousel } from '@lib-transversal';
import { SeriesStore } from '@pages/onboarding/store/series.store';

@Component({
  selector: 'app-featured-series',
  templateUrl: './featured-series.component.html',
  standalone: true,
  imports: [CarouselComponent],
  providers: [SeriesStore],
  styleUrl: './featured-series.component.scss',
})
export class FeaturedSeriesComponent implements OnInit {
  posters = signal<ItemsCarousel[]>([]);

  private router = inject(Router);
  private seriesStore = inject(SeriesStore);

  constructor() {
    effect(
      () => {
        this.posters.set(this.seriesCarousel());
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit() {
    this.__getFeaturedSeries();
  }

  private __getFeaturedSeries({ page = 1 }: { page: number } = { page: 1 }): void {
    this.seriesStore.loadPagesSeries(page);
    this.posters.set(this.seriesCarousel());
  }

  private seriesCarousel(): ItemsCarousel[] {
    return this.seriesStore.series().map(
      ({ id_serie, title, poster_path, vote_average, overview, media_type }) =>
        ({
          id: id_serie,
          title,
          poster_path,
          vote_average,
          overview,
          media_type,
        }) as ItemsCarousel,
    );
  }

  onPoster(poster: ItemsCarousel): void {
    this.router.navigate(['poster-detail', poster.media_type, poster.id]);
  }

  onReachEnd(reachEnd: boolean): void {
    if (!reachEnd) return;

    const pageLast = this.seriesStore
      .series()
      .reduce((max, movie) => (movie.page > max ? movie.page : max), 0);
    this.__getFeaturedSeries({ page: pageLast + 1 });
  }
}
