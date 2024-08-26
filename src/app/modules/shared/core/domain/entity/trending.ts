import { RecordType } from './record.type';

export type Trending = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  media_type: string;
} & RecordType;
