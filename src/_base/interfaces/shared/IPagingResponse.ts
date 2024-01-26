export interface IPagingResponse<T> {
  results: T[];
  results_length: number;
  page: number;
  limit: number;
  pages: number;
  total: number;
}
