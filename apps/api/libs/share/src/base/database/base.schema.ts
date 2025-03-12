import { Schema } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";

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
})
export class BaseSchema {
  public _id?: string | Types.ObjectId;

  @Prop()
  public created_at: number;

  @Prop()
  public updated_at: number;

  @Prop({ default: null })
  public deleted_at?: Date;
}
