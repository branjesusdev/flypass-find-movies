import { RecordType } from './record.type';

export type FeaturedMovie = {
  id_movie: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  media_type: string;
} & RecordType;
