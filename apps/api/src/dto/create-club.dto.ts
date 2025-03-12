import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClubDto {
  @ApiProperty({ example: 'Chess Club' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A club for chess enthusiasts.' })
  @IsString()
  description: string;
} 