import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, defaultIfEmpty, filter, map, Observable, tap, throwError } from 'rxjs';

// RERSOURCES

import { PATHS } from '@conf/paths';
import { TheMovieDBPort } from '@shared/core/domain/ports/themoviedb-port.class';
import { environment } from '@environment';

// ENTITIES

import {
  OutFeaturedMovie,
  OutFeaturedSerie,
  OutMovieDetail,
  OutSearchMulti,
  OutSerieDetail,
  OutTrending,
} from '@shared/command/adapters/response';
import {
  FeaturedMovie,
  FeaturedSerie,
  DetailPoster,
  SearchMulti,
  Trending,
  MediaType,
} from '@shared/core/domain/entity';

@Injectable()
export class HttpTmdbAdapterService implements TheMovieDBPort {
  constructor(private http: HttpClient) {}

  getTrending(): Observable<Trending[]> {
    const url = PATHS.trending;

    return this.http.get<OutTrending>(url).pipe(
      map((outMovieDetails) =>
        outMovieDetails.results.map(
          (outMovieDetail) =>
            ({
              id: outMovieDetail.id,
              title: outMovieDetail.title,
              poster_path: `${environment.PREFIX_URL_PREVIEW_IMG}${outMovieDetail.poster_path}`,
              vote_average: outMovieDetail.vote_average,
              overview: outMovieDetail.overview,
              media_type: outMovieDetail.media_type,
            }) as Trending,
        ),
      ),
    );
  }

  getFeaturedMovies(): Observable<FeaturedMovie[]> {
    const url = PATHS.movies.featured;

    return this.http.get<OutFeaturedMovie>(url).pipe(
      map((outMovieDetails) =>
        outMovieDetails.results.map(
          (outMovieDetail) =>
            ({
              id_movie: outMovieDetail.id,
              title: outMovieDetail.title,
              poster_path: `${environment.PREFIX_URL_PREVIEW_IMG}${outMovieDetail.poster_path}`,
              vote_average: outMovieDetail.vote_average,
              media_type: MediaType.Movie,
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
              poster_path: `${environment.PREFIX_URL_PREVIEW_IMG}${outSerieDetail.poster_path}`,
              vote_average: outSerieDetail.vote_average,
              overview: outSerieDetail.overview,
              media_type: MediaType.Tv,
            }) as FeaturedSerie,
        ),
      ),
    );
  }

  searchMovies(query: string): Observable<SearchMulti[]> {
    const params = new HttpParams().set('query', query).set('include_adult', 'false');

    const url = PATHS.search;

    return this.http.get<OutSearchMulti>(url, { params }).pipe(
      filter(
        (outSearchMulti) =>
          outSearchMulti.results.length > 0 &&
          outSearchMulti.results.some(
            (result) => result.media_type === MediaType.Movie || result.media_type === MediaType.Tv,
          ),
      ),
      map((outSearchMulti) =>
        outSearchMulti.results.map(
          (outSearchMulti) =>
            ({
              id: outSearchMulti.id,
              title: outSearchMulti.title,
              poster_path: `${environment.PREFIX_URL_PREVIEW_IMG}${outSearchMulti.poster_path}`,
              release_date: outSearchMulti?.release_date || '',
              media_type: outSearchMulti.media_type,
              distribution: outSearchMulti?.name,
            }) as SearchMulti,
        ),
      ),
      defaultIfEmpty([]),
      catchError((error) => {
        return throwError(() => []);
      }),
    );
  }

  getSeriesDetails(seriesId: number): Observable<DetailPoster> {
    const url = PATHS.series.details(seriesId);

    return this.http.get<OutSerieDetail>(url).pipe(
      map(
        (outSerieDetail) =>
          ({
            id: outSerieDetail.id,
            name: outSerieDetail.name,
            overview: outSerieDetail.overview,
            poster_path: `${environment.PREFIX_URL_PREVIEW_IMG}${outSerieDetail.poster_path}`,
            vote_average: outSerieDetail.vote_average,
            first_air_date: outSerieDetail.first_air_date,
            genres: outSerieDetail.genres?.map((genre) => genre.name),
            number_of_episodes: outSerieDetail.number_of_episodes,
            number_of_seasons: outSerieDetail.number_of_seasons,
            tagline: outSerieDetail.tagline,
            media_type: MediaType.Tv,
            popularity: outSerieDetail.popularity,
            production_companies:
              outSerieDetail?.production_companies?.map((company) => company.name) ?? [],
            production_countries:
              outSerieDetail?.production_countries?.map((country) => country.name) ?? [],
            spoken_languages:
              outSerieDetail?.spoken_languages?.map((language) => language.name) ?? [],
          }) as DetailPoster,
      ),
    );
  }

  getMovieDetails(movieId: number): Observable<DetailPoster> {
    const url = PATHS.movies.details(movieId);

    return this.http.get<OutMovieDetail>(url).pipe(
      map(
        (outMovieDetails) =>
          ({
            id: outMovieDetails.id,
            name: outMovieDetails.title,
            overview: outMovieDetails.overview,
            poster_path: `${environment.PREFIX_URL_PREVIEW_IMG}${outMovieDetails.poster_path}`,
            vote_average: outMovieDetails.vote_average,
            release_date: outMovieDetails.release_date,
            genres: outMovieDetails.genres?.map((genre) => genre.name),
            runtime: outMovieDetails.runtime,
            tagline: outMovieDetails.tagline,
            media_type: MediaType.Movie,
            popularity: outMovieDetails.popularity,
            production_companies:
              outMovieDetails?.production_companies?.map((company) => company.name) ?? [],
            production_countries:
              outMovieDetails?.production_countries?.map((country) => country.name) ?? [],
            spoken_languages:
              outMovieDetails?.spoken_languages?.map((language) => language.name) ?? [],
          }) as DetailPoster,
      ),
    );
  }
}
