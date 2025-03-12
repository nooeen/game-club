import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubModel, ClubSchema } from './club.schema';
import { ClubsRepository } from './clubs.repository';
import { ClubsService } from './clubs.service';
import { COLLECTIONS } from '@app/share';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: COLLECTIONS.CLUBS.SINGULAR,
      collection: COLLECTIONS.CLUBS.PLURAL,
      useFactory: () => {
        const schema = ClubSchema;
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
  providers: [ClubsRepository, ClubsService],
  exports: [ClubsService],
})
export class ClubsModule { }
