import { NotFoundException, ConflictException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ClubNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Club not found');
  }

  @ApiProperty({ type: String, description: 'The message of the exception', required: false })
  message: string = 'Club not found';

  @ApiProperty({ type: String, description: 'The error of the exception', required: false })
  error: string = 'Not Found';

  @ApiProperty({ type: Number, example: 404, description: 'The status code of the exception', required: false })
  statusCode: number = 404;
}

export class ClubConflictException extends ConflictException {
  constructor(message?: string) {
    super(message || 'Club name already exists');
  }

  @ApiProperty({ type: String, description: 'The message of the exception', required: false })
  message: string = 'Club name already exists';

  @ApiProperty({ type: String, description: 'The error of the exception', required: false })
  error: string = 'Conflict';

  @ApiProperty({ type: Number, example: 409, description: 'The status code of the exception', required: false })
  statusCode: number = 409;
}