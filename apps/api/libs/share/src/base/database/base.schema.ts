import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";

export class BaseSchema {
  public _id?: string | Types.ObjectId;

  @Prop()
  public created_at: number;

  @Prop()
  public updated_at: number;

  @Prop({ default: null })
  public deleted_at?: Date;
}
