import { Body, Controller, Get, Post, Query, HttpStatus, HttpCode, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ClubsService } from '../../libs/clubs/src/clubs.service';
import { CreateClubDto } from '../dto/create-club.dto';
import { FindClubsDto } from '../dto/find-clubs.dto';
import { PATHS } from '@app/share';
import { ClubConflictException } from '../exceptions/club.exceptions';

@ApiTags('Clubs')
@Controller(PATHS.CLUBS)
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new game club' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The club has been successfully created.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Club name already exists.' })
  @ApiBody({ type: CreateClubDto })
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
  @ApiOperation({ summary: 'Retrieve a list of all game clubs' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of clubs retrieved successfully.' })
  @ApiQuery({ name: 'search', required: false, description: 'Search term for club names' })
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