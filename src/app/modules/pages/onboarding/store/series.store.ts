import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { FeaturedSerie, MediaType } from '@shared/core/domain/entity';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';

interface SeriesState {
  featuredSeries: FeaturedSerie[];
  state: 'loading' | 'success' | 'error';
  filter: {
    page: number;
    totalPages: number;
  };
}

const initialState: SeriesState = {
  featuredSeries: [],
  state: 'loading',
  filter: {
    page: 1,
    totalPages: 20,
  },
};

export const SeriesStore = signalStore(
  withState(initialState),
  withComputed(({ featuredSeries }) => ({
    series: computed(() => featuredSeries()),
    spellSeries: computed(() =>
      featuredSeries().filter((serie) => serie.media_type === MediaType.Tv),
    ),
    hasSeries: computed(() => featuredSeries().length > 0),
    hasMoreSeries: computed(() => featuredSeries().length < 20),
  })),
  withMethods((store, service = inject(TheMovieDBPort)) => ({
    loadPagesSeries: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { state: 'loading' })),
        switchMap((page) =>
          service
            .getFeaturedSeries({ page })
            .pipe(tap((series) => patchState(store, { featuredSeries: series, state: 'success' }))),
        ),
        catchError(() => {
          patchState(store, { state: 'error' });
          return EMPTY;
        }),
      ),
    ),
  })),
);
