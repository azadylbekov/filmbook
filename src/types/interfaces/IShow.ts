import { IGenre } from "./IGenre";

export interface IShow {
  id: number | string;
  poster_path?: string;
  tagline: string;
  vote_average: string;
  genres: IGenre[];
  status: string;
  overview: string;
  homepage: string;
  name: string;
  first_air_date: string;
  origin_country: [];
  episode_run_time: [];
  number_of_seasons: number;
  number_of_episodes: number;
  media_type?: string;
  original_title?: string;
  original_name?: string;
  release_date?: string;
  rating?: number;
  backdrop_path?: string;
}
