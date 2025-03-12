import { NullableType } from "../../common/ts/nullable.type";
import { HydratedDocument, Model, UpdateWriteOpResult } from "mongoose";
import { BaseSchema } from "./base.schema";
import { QueryOptions } from "../../common/ts/query-options";
import {
  getPaginationProp,
  getTotalPaginatedPages,
} from "../../utils/pagination.util";
import { PageResponse } from "../../common/dto/page-response.dto";
export abstract class BaseRepositoryAbstract<T extends BaseSchema> {
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findOne(
    query: QueryOptions
  ): Promise<NullableType<HydratedDocument<T>>> {
    let dataQuery = this.model.findOne(query.filter);
    return await dataQuery.exec();
  }

  async find(query: QueryOptions) {
    let dataQuery: any;
    

    if (query.filter) {
      dataQuery = this.model.find(query.filter);
      
    }

    if (query.sort !== null) {
      dataQuery.sort(query.sort);
      
    }

    if (query.limit !== null) {
      dataQuery.limit(query.limit);
    }

    if (query.offset !== null) {
      dataQuery.skip(query.offset);
    }

    if (query.select) {
      dataQuery.select(query.select);
    }

    if (query.cursor) {
      return dataQuery.cursor();
    }

    return await dataQuery.exec();
  }

  async findWithPagination(
    query: QueryOptions
  ): Promise<PageResponse<HydratedDocument<T>>> {
    let dataQuery: any;
    let dataCountQuery: any;

    if (query.filter) {
      dataCountQuery = this.model.countDocuments(query.filter);
      dataQuery = this.model.find(query.filter);
    } else {
      dataCountQuery = this.model.countDocuments({});
      dataQuery = this.model.find({});
    }

    if (query.sort !== null) {
      dataQuery.sort(query.sort);
    }

    // offset is disabled for this function

    if (query.select) {
      dataCountQuery.select(query.select);
      dataQuery.select(query.select);
    }

    if (query.page && query.limit) {
      dataQuery.skip(getPaginationProp(query.page, query.limit).offset);
    }

    if (query.limit !== null) {
      dataQuery.limit(query.limit);
    }

    const countQuery = await dataCountQuery.exec();

    return {
      data: await dataQuery.exec(),
      page: query.page ?? 1,
      total_items: countQuery,
      total_pages: query.limit ? getTotalPaginatedPages(query.limit, countQuery) : 1,
    };
  }

  async updateOne(filter: any, data: any): Promise<UpdateWriteOpResult> {
    return await this.model
      .updateOne(filter, data, { new: true, upsert: true })
      .exec();
  }

  async updateMany(filter: any, data: any): Promise<UpdateWriteOpResult> {
    return await this.model
      .updateMany(filter, data, { new: true, upsert: true })
      .exec();
  }

  async softDelete(id: number | string): Promise<UpdateWriteOpResult> {
    return await this.model.updateOne({_id: id}, {deleted_at: new Date()});
  }

  async count(query: QueryOptions): Promise<number> {
    let dataQuery: any;

    if (query.filter) {
      dataQuery = this.model.countDocuments(query.filter);
    } else {
      dataQuery = this.model.countDocuments({});
    }

    return await dataQuery.exec();
  }
}
