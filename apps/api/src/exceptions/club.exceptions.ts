import { NotFoundException, ConflictException } from '@nestjs/common';

export class ClubNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Club not found');
  }
}

export class ClubConflictException extends ConflictException {
  constructor(message?: string) {
    super(message || 'Club name already exists');
  }
} 