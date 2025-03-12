import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event.schema';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';
import { COLLECTIONS } from '@app/share';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: COLLECTIONS.EVENTS.SINGULAR,
      collection: COLLECTIONS.EVENTS.PLURAL,
      useFactory: () => {
        const schema = EventSchema;
        schema.pre('find', function () {
          this.where({
            deleted_at: null,
          });
        });
        schema.pre('findOne', function () {
          this.where({ deleted_at: null });
        });
        return schema;
      },
    }]),
  ],
  providers: [EventsRepository, EventsService],
  exports: [EventsService],
})
export class EventsModule { }
