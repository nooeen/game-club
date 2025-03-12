import { Module } from '@nestjs/common';
import { ShareModule } from '@app/share';
import { ClubsModule } from '@app/clubs';
import { EventsModule } from '@app/events';
import { EventsController } from './controllers/events.controller';
import { ClubsController } from './controllers/clubs.controller';

@Module({
  imports: [ShareModule, ClubsModule, EventsModule],
  controllers: [ClubsController, EventsController],
})
export class ApiModule {}
