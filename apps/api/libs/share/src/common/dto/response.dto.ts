import { ApiProperty } from '@nestjs/swagger';

export type Response<T> = Readonly<{
  data: T[];
  created_at: number;
}>;

export class ResponseDto<T> implements Response<T> {
  constructor(data: T[]) {
    this.data = data;
  }

  @ApiProperty({ type: 'array', items: { type: 'object' }, description: 'Array of data items' })
  data: T[];

  @ApiProperty({ type: Number, description: 'Timestamp of creation', required: false })
  created_at = new Date().getTime();
}
