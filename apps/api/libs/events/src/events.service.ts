import { Injectable } from "@nestjs/common";
import { BaseServiceAbstract } from "@app/share";
import { EventModel } from "./event.schema";
import { EventsRepository } from "./events.repository";

@Injectable()
export class EventsService extends BaseServiceAbstract<EventModel> {
  constructor(private repo: EventsRepository) {
    super(repo);
  }
}
