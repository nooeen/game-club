import { IsNotEmpty, IsString } from 'class-validator';

export class EventDto {
  @IsString({ message: 'Id must be a string' })
  @IsNotEmpty({ message: 'Id is required' })
  id: string;
} 