import { Body, Controller, Get, Param, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { EventsService } from '../../libs/events/src/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { PATHS } from '@app/share';
import { Types } from 'mongoose';
import { EventDto } from '../dto/event.dto';
import { ClubsService } from '@app/clubs/clubs.service';
import { ClubNotFoundException } from '../exceptions/club.exceptions';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService, private readonly clubsService: ClubsService) {}

  @Post(PATHS.EVENTS)
  @HttpCode(HttpStatus.CREATED)
  async create(@Param() eventParamDto: EventDto, @Body() createEventDto: CreateEventDto) {
    const club = await this.clubsService.findOne({filter: {id: new Types.ObjectId(eventParamDto.id)}});
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
  async findByClub(@Param() eventParamDto: EventDto) {
    return await this.eventsService.find({
      filter: {
        club_id: new Types.ObjectId(eventParamDto.id),
      },
      sort: { scheduled_at: 1 },
    });
  }
} 