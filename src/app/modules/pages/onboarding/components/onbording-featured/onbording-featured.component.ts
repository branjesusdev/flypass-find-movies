import { Component, signal } from '@angular/core';

import { MenuItemTab, TabPanelComponent, TabViewComponent } from '@lib-transversal';

import { FeaturedSeriesComponent } from '@pages/onboarding/components/featured-series/featured-series.component';
import { FeaturedMoviesComponent } from '@pages/onboarding/components/featured-movies/featured-movies.component';
import { CommonModule } from '@angular/common';

enum TabKey {
  MOVIES = 'movies',
  SERIES = 'series',
}

@Component({
  selector: 'app-onbording-featured',
  standalone: true,
  imports: [
    FeaturedSeriesComponent,
    FeaturedMoviesComponent,
    TabViewComponent,
    CommonModule,
    TabPanelComponent,
  ],
  templateUrl: './onbording-featured.component.html',
  styleUrl: './onbording-featured.component.scss',
})
export class OnbordingFeaturedComponent {
  tabs: MenuItemTab[] = [
    { title: 'Movies', content: TabKey.MOVIES },
    { title: 'Series', content: TabKey.SERIES },
  ];

  isMovies = signal<boolean>(true);
  isSeries = signal<boolean>(false);

  handleTabSelected(tab: string) {
    this.isMovies.set(tab === TabKey.MOVIES);
    this.isSeries.set(tab === TabKey.SERIES);
  }
}
