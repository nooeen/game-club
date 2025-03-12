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
export class ClubModel extends BaseSchema {
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
  })
  public name: string;

  @Prop({
    type: String,
  })
  public description: string;
}

export type ClubDocument = ClubModel & mongoose.Document;
const schema = SchemaFactory.createForClass(ClubModel);

schema.pre("save", function (this: ClubModel, next) {
  this.updated_at = Date.now();
  next();
});
schema.loadClass(ClubModel);

export const ClubSchema = schema;
