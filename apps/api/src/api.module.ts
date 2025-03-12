import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ShareModule } from '@app/share';
import { ClubsModule } from '@app/clubs';
import { EventsModule } from '@app/events';

@Module({
  imports: [ShareModule, ClubsModule, EventsModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
