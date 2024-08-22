export type DetailPoster = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genres: string[];
  tagline: string;
  media_type: string;
  release_date?: Date;
  runtime?: number;
  number_of_episodes?: number;
  first_air_date?: Date;
  number_of_seasons?: number;
  popularity: number;
  production_companies: string[];
  production_countries: string[];
  spoken_languages: string[];
};
