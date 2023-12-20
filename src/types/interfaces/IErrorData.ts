export interface IErrorData {
  status_code: string | number;
  status_message: string;
  errors?: Array<string>;
  success: boolean;
}