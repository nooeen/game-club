import { IsOptional, IsString } from 'class-validator';

export class FindClubsDto {
  @IsString()
  @IsOptional()
  search?: string;
} 