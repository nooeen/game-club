import { Body, Controller, Get, Post, Query, HttpStatus, HttpCode, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiOkResponse, ApiConflictResponse, ApiCreatedResponse, ApiExtraModels, ApiBadRequestResponse } from '@nestjs/swagger';
import { ClubsService } from '../../libs/clubs/src/clubs.service';
import { CreateClubDto } from '../dto/create-club.dto';
import { FindClubsDto } from '../dto/find-clubs.dto';
import { PATHS } from '@app/share';
import { ClubConflictException } from '../exceptions/club.exceptions';
import { ResponseDto } from '@app/share/common/dto/response.dto';
import { Club, ClubModel } from '@app/clubs/club.schema';

@ApiTags('Clubs')
@ApiExtraModels(Club)
@Controller(PATHS.CLUBS)
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new game club' })
  @ApiCreatedResponse({
    type: ResponseDto,
    description: 'The club has been successfully created.',
  })
  @ApiConflictResponse({
    type: ClubConflictException,
    description: 'Club name already exists.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @ApiBody({ type: CreateClubDto })
  async create(@Body() createClubDto: CreateClubDto) {
    try {
      return await this.clubsService.create(createClubDto);
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error
        throw new ClubConflictException();
      }
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a list of all game clubs' })
  @ApiOkResponse({
    type: ResponseDto,
    description: 'List of clubs retrieved successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term for club names',
  })
  async findAll(
    @Query() findClubsDto: FindClubsDto,
  ): Promise<ResponseDto<ClubModel[]>> {
    const filter: any = {};
    if (findClubsDto.search) {
      filter.name = { $regex: findClubsDto.search, $options: 'i' };
      filter.description = { $regex: findClubsDto.search, $options: 'i' };
    }

    const clubs = await this.clubsService.find({
      filter,
    });

    return new ResponseDto<ClubModel[]>(clubs);
  }
}
