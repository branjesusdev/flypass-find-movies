import { Observable } from 'rxjs';

import { FeaturedMovie, FeaturedSerie, DetailPoster, Trending } from '@shared/core/domain/entity';
import { SearchMulti } from '../entity/search-multi';

export abstract class TheMovieDBPort {
  abstract getFeaturedMovies(): Observable<FeaturedMovie[]>;
  abstract getFeaturedSeries(): Observable<FeaturedSerie[]>;
  abstract getTrending(): Observable<Trending[]>;
  abstract getMovieDetails(movieId: number): Observable<DetailPoster>;
  abstract getSeriesDetails(seriesId: number): Observable<DetailPoster>;
  abstract searchMovies(query: string): Observable<SearchMulti[]>;
}
