import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DetailPoster } from '@shared/core/domain/entity';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';

export const posterDetailResolver: ResolveFn<DetailPoster | null> = (route) => {
  const { mediaType, id } = route.params;
  const theMovieDBPort = inject(TheMovieDBPort);

  switch (mediaType) {
    case 'movie':
      return theMovieDBPort.getMovieDetails(id);
    case 'tv':
      return theMovieDBPort.getSeriesDetails(id);
    default:
      return null;
  }
};
