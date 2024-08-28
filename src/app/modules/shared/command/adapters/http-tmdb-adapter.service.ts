import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  catchError,
  defaultIfEmpty,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

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
  DetailPosterMovie,
  DetailPosterSeries,
} from '@shared/core/domain/entity';
import { AplicationStore } from '@shared/store/aplication.store';

@Injectable()
export class HttpTmdbAdapterService implements TheMovieDBPort {
  constructor(
    private http: HttpClient,
    private store: AplicationStore<any>,
  ) {}

  private obserberResponse<T>(object: T[]): Observable<T[]> {
    return of(Object.keys(object).map((key) => object[key as any])) as Observable<T[]>;
  }

  getTrending({ page = 1 }: { page: number }): Observable<Trending[]> {
    const url = `${PATHS.trending}`;
    const store = this.store.getStateValue('trending') as Trending[];

    if (store && page == 1) return this.obserberResponse(store) as Observable<Trending[]>;

    const params = new HttpParams().set('page', page.toString());

    return this.http.get<OutTrending>(url, { params }).pipe(
      distinctUntilChanged(),
      map((outTrending) =>
        outTrending.results.map(
          (outMovieDetail) =>
            ({
              id: outMovieDetail.id,
              title: outMovieDetail.title,
              poster_path: `${environment.PREFIX_URL_PREVIEW_IMG}${outMovieDetail.poster_path}`,
              vote_average: outMovieDetail.vote_average,
              overview: outMovieDetail.overview,
              media_type: outMovieDetail.media_type,
              page: outTrending.page,
            }) as Trending,
        ),
      ),
      tap((trending) => {
        this.store.saveState$({ key: 'trending', info: trending as Trending[] });
      }),
      switchMap((trending) => {
        if (store) return of([...store, ...trending]);
        return of(trending);
      }),
    );
  }

  getFeaturedMovies({ page = 1 }: { page?: number }): Observable<FeaturedMovie[]> {
    const url = PATHS.movies.featured;
    const store = this.store.getStateValue('featuredMovies') as FeaturedMovie[];

    if (store && page == 1) return this.obserberResponse(store) as Observable<FeaturedMovie[]>;

    const params = new HttpParams().set('page', page.toString());

    return this.http.get<OutFeaturedMovie>(url, { params }).pipe(
      distinctUntilChanged(),
      map((outMovieDetails) =>
        outMovieDetails.results.map(
          (outMovieDetail) =>
            ({
              id_movie: outMovieDetail.id,
              title: outMovieDetail.title,
              poster_path: `${environment.PREFIX_URL_PREVIEW_IMG}${outMovieDetail.poster_path}`,
              vote_average: outMovieDetail.vote_average,
              media_type: MediaType.Movie,
              overview: outMovieDetail.overview,
              page: outMovieDetails.page,
            }) as FeaturedMovie,
        ),
      ),
      tap((movies) => {
        const moviesStore = page == 1 ? movies : [...store, ...movies];
        this.store.saveState$({ key: 'featuredMovies', info: moviesStore });
      }),
      switchMap((movies) => {
        if (store) return of([...store, ...movies]);
        return of(movies);
      }),
    );
  }

  getFeaturedSeries({ page = 1 }: { page?: number }): Observable<FeaturedSerie[]> {
    const url = PATHS.series.featured;
    const store = this.store.getStateValue('featuredSeries') as FeaturedSerie[];

    if (store && page == 1) return this.obserberResponse(store);

    const params = new HttpParams().set('page', page.toString());

    return this.http.get<OutFeaturedSerie>(url, { params }).pipe(
      distinctUntilChanged(),
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
              page: outFeaturedSerie.page,
            }) as FeaturedSerie,
        ),
      ),
      tap((series) => {
        this.store.saveState$({ key: 'featuredSeries', info: series as FeaturedSerie[] });
      }),
      switchMap((series) => {
        if (store) return of([...store, ...series]);
        return of(series);
      }),
    );
  }

  searchMovies(query: string): Observable<SearchMulti[]> {
    const params = new HttpParams().set('query', query).set('include_adult', 'false');
    const url = PATHS.search;

    return this.http.get<OutSearchMulti>(url, { params }).pipe(
      distinctUntilChanged(),
      shareReplay(1),
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
              title:
                MediaType.Movie === outSearchMulti.media_type
                  ? outSearchMulti.title
                  : outSearchMulti.name,
              poster_path: `${environment.PREFIX_URL_PREVIEW_IMG}${outSearchMulti.poster_path}`,
              release_date: outSearchMulti?.first_air_date || '',
              media_type: outSearchMulti.media_type,
              overview: outSearchMulti?.overview,
            }) as SearchMulti,
        ),
      ),
      defaultIfEmpty([]),
      catchError((error) => {
        return throwError(() => []);
      }),
    );
  }

  getSeriesDetails(seriesId: number): Observable<DetailPosterSeries> {
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
          }) as DetailPosterSeries,
      ),
    );
  }

  getMovieDetails(movieId: number): Observable<DetailPosterMovie> {
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
          }) as DetailPosterMovie,
      ),
    );
  }
}
