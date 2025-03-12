import { IsInt, IsOptional, ValidateNested } from "class-validator";

export type PageResponse<T> = Readonly<{
  data: T[];
  page: number;
  total_items: number;
  total_pages: number;
  created_at?: number;
}>;

export class PageResponseDto<T> implements PageResponse<T> {
  @ValidateNested()
  data: T[];

  @IsInt()
  page: number;

  @IsInt()
  total_items: number;

  @IsInt()
  total_pages: number;

  @IsOptional()
  @IsInt()
  created_at?: number;
}
