import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsDate({ message: 'Scheduled date must be a valid date' })
  @IsNotEmpty({ message: 'Scheduled date is required' })
  scheduled_at: Date;
} 