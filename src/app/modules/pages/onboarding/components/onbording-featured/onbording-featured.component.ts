import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TabViewModule } from 'primeng/tabview';

import { MenuItemTab } from '@lib-transversal';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { FeaturedMovie, FeaturedSerie } from '@shared/core/domain/entity';

import { FeaturedSeriesComponent } from '@pages/onboarding/components/featured-series/featured-series.component';
import { FeaturedMoviesComponent } from '@pages/onboarding/components/featured-movies/featured-movies.component';
@Component({
  selector: 'app-onbording-featured',
  standalone: true,
  imports: [TabViewModule, FeaturedSeriesComponent, FeaturedMoviesComponent],
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

  private __getFeaturedMovies(): void {
    this.serviceTmdb
      .getFeaturedMovies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movies) => {
        this.stateMovies.set(movies);
      });
  }

  private __getFeaturedSeries(): void {
    this.serviceTmdb
      .getFeaturedSeries()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((series) => {
        this.stateSeries.set(series);
      });
  }
}
