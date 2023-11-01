import { CsvFileError } from "./csv-file-error.interface";

export interface CsvFileResponse {
  insertsCount:         number,
  updatesCount:         number,
  errors:               CsvFileError[]
}
