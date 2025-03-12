import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  @IsString({ message: 'Id must be a string' })
  @IsNotEmpty({ message: 'Id is required' })
  @Matches(/^[0-9a-fA-F]{24}$/, { message: 'Id must be a 24 character hex string' })
  id: string;
} 