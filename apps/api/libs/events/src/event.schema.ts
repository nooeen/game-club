import { ClubModel } from "@app/clubs/club.schema";
import { BaseSchema } from "@app/share";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

@Schema({
  // _id: false,
  // id: false,
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  toJSON: {
    getters: true,
  },
  versionKey: false,
})
export class EventModel extends BaseSchema {
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
