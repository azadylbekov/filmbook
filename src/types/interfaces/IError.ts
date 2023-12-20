import { IErrorData } from "..";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";


export interface IError {
  status?: string | number;
  data?: IErrorData | FetchBaseQueryError;
}
