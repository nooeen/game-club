import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindClubsDto {
  @ApiPropertyOptional({ example: 'chess' })
  @IsString()
  @IsOptional()
  search?: string;
} 