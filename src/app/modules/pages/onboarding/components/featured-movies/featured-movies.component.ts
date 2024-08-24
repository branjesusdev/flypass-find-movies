import { Component, Input, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, ItemsCarousel } from '@lib-transversal';
import { FeaturedMovie } from '@shared/core/domain/entity';

@Component({
  selector: 'app-featured-movies',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './featured-movies.component.html',
  styleUrl: './featured-movies.component.scss',
})
export class FeaturedMoviesComponent {
  @Input({ required: true }) set featuredMovies(series: FeaturedMovie[]) {
    const seriesMap = series.map(
      (serie) =>
        ({
          id: serie.id_movie,
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

  constructor(private router: Router) {}

  onPoster(poster: ItemsCarousel): void {
    this.router.navigate(['poster-detail', poster.media_type, poster.id]);
  }
}
