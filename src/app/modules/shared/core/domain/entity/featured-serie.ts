import { MediaType } from './media-type';
import { RecordType } from './record.type';

export type FeaturedSerie = {
  id_serie: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  media_type: MediaType;
} & RecordType;
