import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// RERSOURCES

import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { OutMovieDetails } from './response/out-movie-details';
import { MovieDetails } from '@shared/core/domain/entity';
import { PATHS } from '@conf/paths';

@Injectable({
  providedIn: 'root',
})
export class HttpTmdbAdapterService implements TheMovieDBPort {
  constructor(private http: HttpClient) {}

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    const url = PATHS.movie.details(movieId);

    return this.http.get<OutMovieDetails>(url).pipe(
      map(
        (outMovieDetails) =>
          ({
            id: outMovieDetails.id,
            title: outMovieDetails.title,
            overview: outMovieDetails.overview,
            poster_path: outMovieDetails.poster_path,
            vote_average: outMovieDetails.vote_average,
            release_date: outMovieDetails.release_date.toDateString(),
            genres: outMovieDetails.genres.map((genre) => genre.name),
            runtime: outMovieDetails.runtime,
            tagline: outMovieDetails.tagline,
          }) as MovieDetails,
      ),
    );
  }
}
