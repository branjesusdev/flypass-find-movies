import { Observable } from 'rxjs';

import {
  FeaturedMovie,
  FeaturedSerie,
  DetailPosterMovie,
  DetailPosterSeries,
  Trending,
} from '@shared/core/domain/entity';
import { SearchMulti } from '../entity/search-multi';

export abstract class TheMovieDBPort {
  abstract getFeaturedMovies({ page }: { page?: number }): Observable<FeaturedMovie[]>;
  abstract getFeaturedSeries({ page }: { page?: number }): Observable<FeaturedSerie[]>;
  abstract getTrending({ page }: { page: number }): Observable<Trending[]>;
  abstract getMovieDetails(movieId: number): Observable<DetailPosterMovie>;
  abstract getSeriesDetails(seriesId: number): Observable<DetailPosterSeries>;
  abstract searchByFilter(query: string): Observable<SearchMulti[]>;
}
