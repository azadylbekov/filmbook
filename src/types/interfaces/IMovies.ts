import { IMovie } from "..";

export interface IMovies {
  results: IMovie[];
  total_pages: number;
  page: number;
  total_results: number;
}