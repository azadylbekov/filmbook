import { IShow } from "..";

export interface IShows {
  results: IShow[];
  total_pages: number;
  page: number;
  total_results: number;
}