import { NullableType } from "@app/share/common/ts/nullable.type";
import { PageResponse } from "../../common/dto/page-response.dto";
import { QueryOptions } from "../../common/ts/query-options";
import { HydratedDocument, UpdateWriteOpResult } from "mongoose";

export interface Write<T> {
  create(item: Partial<T> | T | any): Promise<T>;
  updateOne(filter: any, data: any): Promise<UpdateWriteOpResult>;
  updateMany(filter: any, data: any): Promise<UpdateWriteOpResult>;
  softDelete(id: any): Promise<UpdateWriteOpResult>;
}

export interface Read<T> {
  findOne(query: QueryOptions): Promise<NullableType<HydratedDocument<T>>>;
  find(query: QueryOptions);
  findWithPagination(query: QueryOptions): Promise<PageResponse<HydratedDocument<T>>>;
  count(query: QueryOptions): Promise<number>;
}
export interface BaseServiceInterface<T> extends Write<T>, Read<T> {

}
