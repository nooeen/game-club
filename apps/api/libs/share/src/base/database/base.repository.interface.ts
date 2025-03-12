import { HydratedDocument, UpdateWriteOpResult } from "mongoose";
import { QueryOptions } from "../../common/ts/query-options";
import { PageResponse } from "../../common/dto/page-response.dto";
import { NullableType } from "@app/share/common/ts/nullable.type";

export interface BaseRepositoryInterface<T> {
  create(dto: Partial<T> | T | any): Promise<T>;

  findOne(query: QueryOptions, projection?: string): Promise<NullableType<HydratedDocument<T>>>;

  find(query: QueryOptions);

  findWithPagination(query: QueryOptions): Promise<PageResponse<HydratedDocument<T>>>;

  updateOne(filter: any, data: any): Promise<UpdateWriteOpResult>;

  updateMany(filter: any, data: any): Promise<UpdateWriteOpResult>;

  softDelete(id: string): Promise<UpdateWriteOpResult>;

  count(query: QueryOptions): Promise<number>;
}
