import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// RERSOURCES

import { PATHS } from '@conf/paths';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';

// ENTITIES

import {
  OutFeaturedMovie,
  OutFeaturedSerie,
  OutMovieDetail,
  OutSearchMulti,
  OutSerieDetail,
} from '@shared/command/adapters/response';
import {
  FeaturedMovie,
  FeaturedSerie,
  MovieDetails,
  SerieDetail,
  SearchMulti,
} from '@shared/core/domain/entity';

@Injectable()
export class HttpTmdbAdapterService implements TheMovieDBPort {
  constructor(private http: HttpClient) {}

  getFeaturedMovies(): Observable<FeaturedMovie[]> {
    const url = PATHS.movies.featured;

    return this.http.get<OutFeaturedMovie>(url).pipe(
      map((outMovieDetails) =>
        outMovieDetails.results.map(
          (outMovieDetail) =>
            ({
              id_movie: outMovieDetail.id,
              title: outMovieDetail.title,
              poster_path: outMovieDetail.poster_path,
              vote_average: outMovieDetail.vote_average,
            }) as FeaturedMovie,
        ),
      ),
    );
  }

  getFeaturedSeries(): Observable<FeaturedSerie[]> {
    const url = PATHS.series.featured;

    return this.http.get<OutFeaturedSerie>(url).pipe(
      map((outFeaturedSerie) =>
        outFeaturedSerie.results.map(
          (outSerieDetail) =>
            ({
              id_serie: outSerieDetail.id,
              title: outSerieDetail.name,
              poster_path: outSerieDetail.poster_path,
              vote_average: outSerieDetail.vote_average,
            }) as FeaturedSerie,
        ),
      ),
    );
  }

  getSeriesDetails(seriesId: number): Observable<SerieDetail> {
    const url = PATHS.series.details(seriesId);

    return this.http.get<OutSerieDetail>(url).pipe(
      map(
        (outSerieDetail) =>
          ({
            id: outSerieDetail.id,
            name: outSerieDetail.name,
            overview: outSerieDetail.overview,
            poster_path: outSerieDetail.poster_path,
            vote_average: outSerieDetail.vote_average,
            first_air_date: outSerieDetail.first_air_date.toDateString(),
            genres: outSerieDetail.genres.map((genre) => genre.name),
            number_of_episodes: outSerieDetail.number_of_episodes,
            number_of_seasons: outSerieDetail.number_of_seasons,
            tagline: outSerieDetail.tagline,
          }) as SerieDetail,
      ),
    );
  }

  searchMovies(query: string): Observable<SearchMulti[]> {
    const params = new HttpParams().set('query', query).set('include_adult', 'false');

    const url = PATHS.search;

    return this.http.get<OutSearchMulti>(url, { params }).pipe(
      map((outSearchMulti) =>
        outSearchMulti.results.map(
          (outSearchMulti) =>
            ({
              id: outSearchMulti.id,
              title: outSearchMulti.title,
              poster_path: outSearchMulti.poster_path,
              release_date: outSearchMulti.release_date?.toDateString() || '',
              media_type: outSearchMulti.media_type,
              distribution: outSearchMulti.overview,
            }) as SearchMulti,
        ),
      ),
    );
  }

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    const url = PATHS.movies.details(movieId);

    return this.http.get<OutMovieDetail>(url).pipe(
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
