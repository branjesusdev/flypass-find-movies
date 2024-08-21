import { Observable } from "rxjs";

import { FeaturedMovie, FeaturedSerie, MovieDetails, SerieDetail } from "@shared/core/domain/entity";
import { SearchMulti } from "../entity/search-multi";

export abstract class TheMovieDBPort {

  abstract getFeaturedMovies(): Observable<FeaturedMovie[]>;
  abstract getFeaturedSeries(): Observable<FeaturedSerie[]>;
  abstract getMovieDetails(movieId: number): Observable<MovieDetails>;
  abstract getSeriesDetails(seriesId: number): Observable<SerieDetail>;
  abstract searchMovies(query: string): Observable<SearchMulti[]>;
}
