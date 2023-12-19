import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IGenre } from "./interfaces/IGenre";
import { IMovie } from "./interfaces/IMovie";
import { IShow } from "./interfaces/IShow";
import { IPerson } from "./interfaces/IPerson";
import { ICategory } from "./interfaces/ICategory";
import { ICountry } from "./interfaces/ICountry";
import { ITrailer } from "./interfaces/ITrailer";
import { ITrailers } from "./interfaces/ITrailer";
import { SerializedError } from "./interfaces/SerializedError";
import { ICredit } from "./interfaces/ICredit";

export type ISearchResult = IShow | IMovie;

export type {
  IGenre,
  IMovie,
  IShow,
  IPerson,
  ICategory,
  ICredit,
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
