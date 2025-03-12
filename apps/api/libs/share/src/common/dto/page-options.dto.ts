import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export type PageOptionsType = {
  page?: number;
  limit?: number;
};

export class PageOptionsDto implements PageOptionsType {
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  limit = 24;
}
