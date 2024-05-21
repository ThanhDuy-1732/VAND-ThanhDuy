type Pagination = {
  to?: number;
  from?: number;
  path?: string;
  total?: number;
  per_page?: number;
  last_page?: number;
  current_page?: number;
};

type ErrorResponse = {
  message: string;
};

type ResponsePagination<T> = T & {
  pagination: Pagination;
};

type ValueOf<T> = T[keyof T];