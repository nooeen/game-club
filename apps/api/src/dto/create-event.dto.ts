import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @ApiProperty({ example: 'Chess Tournament' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ example: 'An annual chess tournament for all skill levels.' })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({ example: '2023-12-25T10:00:00Z' })
  @IsDate({ message: 'Scheduled date must be a valid date' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'Scheduled date is required' })
  scheduled_at: Date;
} 