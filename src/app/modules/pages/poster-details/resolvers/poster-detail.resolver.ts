import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DetailPoster } from '@shared/core/domain/entity';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { map } from 'rxjs';

export const posterDetailResolver: ResolveFn<DetailPoster | null> = (route) => {
  const { mediaType, id } = route.params;
  const theMovieDBPort = inject(TheMovieDBPort);

  switch (mediaType) {
    case 'movie':
      return theMovieDBPort.getMovieDetails(id).pipe(map((movie) => movie as DetailPoster));
    case 'tv':
      return theMovieDBPort.getSeriesDetails(id).pipe(map((series) => series as DetailPoster));
    default:
      return null;
  }
};
