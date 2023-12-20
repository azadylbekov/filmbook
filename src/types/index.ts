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
import { IShows } from "./interfaces/IShows";
import { IMovies } from "./interfaces/IMovies";
import { IErrorData } from "./interfaces/IErrorData";
import { IError } from "./interfaces/IError";

export type ISearchResult = IShow | IMovie;

export type {
  IGenre,
  IMovie,
  IMovies,
  IShow,
  IShows,
  IPerson,
  ICategory,
  ICredit,
  ICountry,
  IErrorData,
  IError,
  ITrailer,
  ITrailers,
  SerializedError,
};
