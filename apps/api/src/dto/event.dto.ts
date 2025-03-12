import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class EventDto {
  @IsString({ message: 'Id must be a string' })
  @IsNotEmpty({ message: 'Id is required' })
  @Matches(/^[0-9a-fA-F]{24}$/, { message: 'Id must be a 24 character hex string' })
  id: string;
} 