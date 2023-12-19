import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React from "react";

export interface IGenre {
  id?: number | string;
  name?: string;
  label?: string;
}

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

export interface IMovies {
  results: IMovie[];
  total_pages: number;
  page: number;
  total_results: number;
}

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

export interface IShows {
  results: IShow[];
  total_pages: number;
  page: number;
  total_results: number;
}

export interface IPerson {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
  birthday: string;
  deathday?: string;
  place_of_birth?: string;
  character?: string;
  biography?: string;
}

export interface IErrorData {
  status_code: string;
  status_message: string;
  errors: Array<String>;
}

export interface IError {
  status?: string | number;
  data?: IErrorData | FetchBaseQueryError;
}

export interface ICategory {
  label: string | number;
  value: string;
  icon?: React.ReactElement;
}

export interface ITrailer {
  type: string;
  key: string;
}

export interface ITrailers {
  results: ITrailer[];
}

export type ISearchResult = IShow | IMovie;

export interface ICountry {
  english_name: string | number;
  iso_3166_1: string | number;
}

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

export interface ICredit {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
