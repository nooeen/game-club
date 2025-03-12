import { NotFoundException, BadRequestException } from '@nestjs/common';

export class ClubNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Club not found');
  }
}

export class ClubBadRequestException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Invalid club data');
  }
} 