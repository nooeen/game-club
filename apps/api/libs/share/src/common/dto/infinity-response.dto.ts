import { IsBoolean, IsInt, IsOptional, ValidateNested } from "class-validator";

export type InfinityResponse<T> = Readonly<{
  data: T[];
  hasNextPage: boolean;
  created_at?: number;
}>;

export class InfinityResponseDto<T> implements InfinityResponse<T> {
  @ValidateNested()
  data: T[];

  @IsBoolean()
  hasNextPage: boolean;

  @IsOptional()
  @IsInt()
  created_at?: number;
}
