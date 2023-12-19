import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IGenre } from "./IGenre";
import { IMovie } from "./IMovie";
import { IShow } from "./IShow";
import { IPerson } from "./IPerson";
import { ICategory } from "./ICategory";
import { ICountry } from "./ICountry";
import { ITrailer } from "./ITrailer";
import { ITrailers } from "./ITrailer";
import { SerializedError } from "./SerializedError";

export type ISearchResult = IShow | IMovie;

export type {
  IGenre,
  IMovie,
  IShow,
  IPerson,
  ICategory,
  ICountry,
  ITrailer,
  ITrailers,
  SerializedError,
};

export interface IMovies {
  results: IMovie[];
  total_pages: number;
  page: number;
  total_results: number;
}

export interface IShows {
  results: IShow[];
  total_pages: number;
  page: number;
  total_results: number;
}

export interface IErrorData {
  status_code: string | number;
  status_message: string;
  errors?: Array<string>;
  success: boolean;
}

export interface IError {
  status?: string | number;
  data?: IErrorData | FetchBaseQueryError;
}
