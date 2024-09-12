import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, ItemsCarousel } from '@lib-transversal';
import { MoviesStore } from '@pages/onboarding/store/movies.store';

@Component({
  selector: 'app-featured-movies',
  standalone: true,
  imports: [CarouselComponent],
  providers: [MoviesStore],
  templateUrl: './featured-movies.component.html',
  styleUrl: './featured-movies.component.scss',
})
export class FeaturedMoviesComponent implements OnInit {
  posters = signal<ItemsCarousel[]>([]);
  isSlideToXMovies = signal<number>(0);

  private router = inject(Router);
  private moviesStore = inject(MoviesStore);

  constructor() {
    effect(
      () => {
        this.posters.set(this.moviesCarousel());
        this.isSlideToXMovies.set(5);
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit() {
    this.__getFeaturedMovies();
  }

  private __getFeaturedMovies({ page = 1 }: { page: number } = { page: 1 }): void {
    this.moviesStore.loadPagesMovies(page);
    this.posters.set(this.moviesCarousel());
  }

  private moviesCarousel(): ItemsCarousel[] {
    return this.moviesStore.movies().map(
      ({ id_movie, title, poster_path, vote_average, overview, media_type }) =>
        ({
          id: id_movie,
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

    const pageLast = this.moviesStore
      .movies()
      .reduce((max, movie) => (movie.page > max ? movie.page : max), 0);
    this.__getFeaturedMovies({ page: pageLast + 1 });
  }
}
