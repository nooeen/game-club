import { IsInt, IsOptional, ValidateNested } from "class-validator";

export type Response<T> = Readonly<{
  data: T[];
  created_at?: number;
}>;

export class ResponseDto<T> implements Response<T> {
  @ValidateNested()
  data: T[];

  @IsOptional()
  @IsInt()
  created_at?: number;
}
