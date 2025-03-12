import { InfinityResponse } from "../common/dto/infinity-response.dto";
import { PageOptionsType } from "../common/dto/page-options.dto";

export const getPaginationProp = (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  return {
    offset,
  };
};

export const getTotalPaginatedPages = (limit: number, totalItems: number) => {
  const totalPages = Math.ceil(totalItems / limit);
  return totalPages;
};

export const infinityPagination = <T>(
  data: T[],
  options: PageOptionsType
): InfinityResponse<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};
