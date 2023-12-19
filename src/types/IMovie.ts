import { IGenre } from "./IGenre";

export interface IProductionCompany {
  origin_country: string;
}

export interface IMovie {
  id: number | string;
  tagline: string;
  vote_average: string;
  genres: IGenre[];
  status: string;
  overview: string;
  homepage: string;
  title: string;
  release_date: string;
  production_companies: IProductionCompany[];
  runtime: string;
  budget: number;
  original_title?: string;
  poster_path?: string;
  media_type?: string;
  original_name?: string;
  first_air_date?: string;
  rating?: number;
  backdrop_path?: string;
}
