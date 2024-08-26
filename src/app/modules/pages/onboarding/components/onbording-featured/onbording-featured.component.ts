import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  CarouselComponent,
  MenuItemTab,
  TabPanelComponent,
  TabViewComponent,
} from '@lib-transversal';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { FeaturedMovie, FeaturedSerie } from '@shared/core/domain/entity';

import { FeaturedSeriesComponent } from '@pages/onboarding/components/featured-series/featured-series.component';
import { FeaturedMoviesComponent } from '@pages/onboarding/components/featured-movies/featured-movies.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-onbording-featured',
  standalone: true,
  imports: [
    FeaturedSeriesComponent,
    FeaturedMoviesComponent,
    TabViewComponent,
    CommonModule,
    TabPanelComponent,
    CarouselComponent,
  ],
  templateUrl: './onbording-featured.component.html',
  styleUrl: './onbording-featured.component.scss',
})
export class OnbordingFeaturedComponent implements OnInit {
  tabs: MenuItemTab[] = [
    { title: 'Movies', content: 'movies' },
    { title: 'Series', content: 'series' },
  ];

  stateMovies = signal<FeaturedMovie[]>([]);
  stateSeries = signal<FeaturedSerie[]>([]);

  isMovies = signal<boolean>(true);
  isSeries = signal<boolean>(false);

  constructor(
    private serviceTmdb: TheMovieDBPort,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.__init();
  }

  __init(): void {
    this.__getFeaturedMovies();
    this.__getFeaturedSeries();
  }

  private __getFeaturedMovies({ page = 1 }: { page: number } = { page: 1 }): void {
    this.serviceTmdb
      .getFeaturedMovies({ page })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies) => {
        this.stateMovies.set(movies);
      });
  }

  private __getFeaturedSeries({ page = 1 }: { page: number } = { page: 1 }): void {
    this.serviceTmdb
      .getFeaturedSeries({ page })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((series) => {
        this.stateSeries.set(series);
      });
  }

  handleTabSelected(tab: string) {
    this.isMovies.set(tab === 'movies');
    this.isSeries.set(tab === 'series');
  }

  onMoreMovies(moreMovies: boolean): void {
    if (!moreMovies) return;

    const pageLast = this.stateMovies().reduce(
      (max, movie) => (movie.page > max ? movie.page : max),
      0,
    );
    this.__getFeaturedMovies({ page: pageLast + 1 });
  }

  onMoreSeries(moreSeries: boolean): void {
    if (!moreSeries) return;

    const pageLast = this.stateSeries().reduce(
      (max, serie) => (serie.page > max ? serie.page : max),
      0,
    );
    this.__getFeaturedSeries({ page: pageLast + 1 });
  }
}
