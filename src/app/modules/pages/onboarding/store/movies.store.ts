import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FeaturedMovie, MediaType } from '@shared/core/domain/entity';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';

interface MoviesState {
  featuredMovies: FeaturedMovie[];
  state: 'loading' | 'success' | 'error';
  filter: {
    page: number;
    totalPages: number;
  };
}

const initialState: MoviesState = {
  featuredMovies: [],
  state: 'loading',
  filter: {
    page: 1,
    totalPages: 20,
  },
};

export const MoviesStore = signalStore(
  withState(initialState),
  withComputed(({ featuredMovies }) => ({
    movies: computed(() => featuredMovies()),
    spellMovies: computed(() =>
      featuredMovies().filter((movie) => movie.media_type === MediaType.Movie),
    ),
    hasMovies: computed(() => featuredMovies().length > 0),
    hasMoreMovies: computed(() => featuredMovies().length < 20),
  })),
  withMethods((store, service = inject(TheMovieDBPort)) => ({
    loadPagesMovies: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { state: 'loading' })),
        switchMap((page) =>
          service
            .getFeaturedMovies({ page })
            .pipe(tap((movies) => patchState(store, { featuredMovies: movies, state: 'success' }))),
        ),
        catchError(() => {
          patchState(store, { state: 'error' });
          return EMPTY;
        }),
      ),
    ),
  })),
);
