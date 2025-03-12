import { Body, Controller, Get, Param, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiExtraModels, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { EventsService } from '../../libs/events/src/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { PATHS } from '@app/share';
import { Types } from 'mongoose';
import { EventDto } from '../dto/event.dto';
import { ClubsService } from '@app/clubs/clubs.service';
import { ClubNotFoundException } from '../exceptions/club.exceptions';
import { ResponseDto } from '@app/share/common/dto/response.dto';
import { Event, EventModel } from '@app/events/event.schema';

@ApiTags('Events')
@ApiExtraModels(Event)
@Controller()
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly clubsService: ClubsService,
  ) {}

  @Post(PATHS.EVENTS)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Schedule an event for a specific club' })
  @ApiCreatedResponse({
    type: Event,
    description: 'The event has been successfully scheduled.',
  })
  @ApiNotFoundResponse({
    type: ClubNotFoundException,
    description: 'Club not found.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @ApiParam({ name: 'id', description: 'Club ID' })
  @ApiBody({ type: CreateEventDto })
  async create(
    @Param() eventParamDto: EventDto,
    @Body() createEventDto: CreateEventDto,
  ) {
    const club = await this.clubsService.findOne({
      filter: { _id: new Types.ObjectId(eventParamDto.id) },
    });
    if (!club) {
      throw new ClubNotFoundException('Club not found');
    }

    return await this.eventsService.create({
      ...createEventDto,
      club_id: new Types.ObjectId(eventParamDto.id),
    });
  }

  @Get(PATHS.EVENTS)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all events for a specific club' })
  @ApiOkResponse({
    type: ResponseDto,
    description: 'List of events retrieved successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @ApiParam({ name: 'id', description: 'Club ID' })
  async findByClub(
    @Param() eventParamDto: EventDto,
  ): Promise<ResponseDto<EventModel[]>> {
    const events = await this.eventsService.find({
      filter: {
        club_id: new Types.ObjectId(eventParamDto.id),
      },
      sort: { scheduled_at: 1 },
    });
    return new ResponseDto<EventModel[]>(events);
  }
} 
