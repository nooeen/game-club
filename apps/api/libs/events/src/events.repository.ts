import { Injectable } from "@nestjs/common";
import { BaseRepositoryAbstract, COLLECTIONS } from "@app/share";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepositoryInterface } from "@app/share/base/database/base.repository.interface";
import { EventModel } from "./event.schema";

@Injectable()
export class EventsRepository
  extends BaseRepositoryAbstract<EventModel>
  implements BaseRepositoryInterface<EventModel> {
  constructor(
    @InjectModel(COLLECTIONS.EVENTS.SINGULAR)
    private readonly dbModel: Model<EventModel>
  ) {
    super(dbModel);
  }
}
