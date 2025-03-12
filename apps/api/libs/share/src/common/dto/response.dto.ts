import { IsInt, IsOptional, ValidateNested } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export type Response<T> = Readonly<{
  data: T[];
  created_at?: number;
}>;

export class ResponseDto<T> implements Response<T> {
  constructor(data: T[]) {
    this.data = data;
  }

  @ApiProperty({ type: () => [Object], description: 'Array of data items' })
  @ValidateNested()
  data: T[];

  @ApiProperty({ type: Number, description: 'Timestamp of creation', required: false })
  @IsOptional()
  @IsInt()
  created_at = new Date().getTime();
}
