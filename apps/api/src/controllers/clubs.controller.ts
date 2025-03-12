import { Body, Controller, Get, Post, Query, HttpStatus, HttpCode, Param } from '@nestjs/common';
import { ClubsService } from '../../libs/clubs/src/clubs.service';
import { CreateClubDto } from '../dto/create-club.dto';
import { FindClubsDto } from '../dto/find-clubs.dto';
import { PATHS } from '@app/share';
import { ClubConflictException } from '../exceptions/club.exceptions';

@Controller(PATHS.CLUBS)
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClubDto: CreateClubDto) {
    try {
      return await this.clubsService.create(createClubDto);
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error
        throw new ClubConflictException();
      }
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK) 
  async findAll(@Query() findClubsDto: FindClubsDto) {
    const filter: any = {};
    if (findClubsDto.search) {
      filter.name = { $regex: findClubsDto.search, $options: 'i' };
    }
    
    return await this.clubsService.find({
      filter,
    });
  }
}