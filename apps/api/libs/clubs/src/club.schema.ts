import { BaseSchema } from "@app/share";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class Club {
  @ApiProperty({ type: String, description: 'The name of the club', required: true })
  name: string;
  
  @ApiProperty({ type: String, description: 'The description of the club', required: false })
  description: string;
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
export class ClubModel extends BaseSchema implements Club {
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
