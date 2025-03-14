import { ClubModel } from "@app/clubs/club.schema";
import { BaseSchema } from "@app/share";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Types } from "mongoose";

export class Event {
  @ApiProperty({ type: String, description: 'The title of the event', required: true })
  title: string;

  @ApiProperty({ type: String, description: 'The description of the event', required: false })
  description: string;

  @ApiProperty({ type: Date, description: 'The scheduled date of the event', required: true })
  scheduled_at: Date;
}

@Schema({
  // _id: false,
  id: false,
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  toJSON: {
    getters: true,
  },
  versionKey: false,
})
export class EventModel extends BaseSchema implements Event {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: ClubModel.name,
    required: true,
    index: true,
  })
  public club_id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  public title: string;

  @Prop({
    type: String,
    required: true
  })
  public description: string;

  @Prop({
    type: Date,
    required: true,
  })
  public scheduled_at: Date;
}

export type EventDocument = EventModel & mongoose.Document;
const schema = SchemaFactory.createForClass(EventModel);

schema.pre("save", function (this: EventModel, next) {
  this.updated_at = Date.now();
  next();
});
schema.loadClass(EventModel);

export const EventSchema = schema;
