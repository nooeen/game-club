import { HydratedDocument, UpdateWriteOpResult } from "mongoose";
import { BaseRepositoryInterface } from "../database/base.repository.interface";
import { BaseSchema } from "../database/base.schema";
import { NullableType } from "../../common/ts/nullable.type";
import { BaseServiceInterface } from "./base.service.interface";
import { QueryOptions } from "../../common/ts/query-options";
import { PageResponse } from "../../common/dto/page-response.dto";

export abstract class BaseServiceAbstract<T extends BaseSchema>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  create(item: Partial<T> | T | any): Promise<T> {
    return this.repository.create(item);
  }

  findOne(query: QueryOptions): Promise<NullableType<HydratedDocument<T>>> {
    return this.repository.findOne(query);
  }

  find(query: QueryOptions) {
    return this.repository.find(query);
  }

  findWithPagination(
    query: QueryOptions
  ): Promise<PageResponse<HydratedDocument<T>>> {
    return this.repository.findWithPagination(query);
  }

  updateOne(filter: any, data: any): Promise<UpdateWriteOpResult> {
    return this.repository.updateOne(filter, data);
  }

  updateMany(filter: any, data: any): Promise<UpdateWriteOpResult> {
    return this.repository.updateMany(filter, data);
  }

  softDelete(id: any): Promise<UpdateWriteOpResult> {
    return this.repository.softDelete(id)
  }

  count(query: QueryOptions): Promise<number> {
    return this.repository.count(query);
  }
}
