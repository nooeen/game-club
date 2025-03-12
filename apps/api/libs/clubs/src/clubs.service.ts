import { Injectable } from "@nestjs/common";
import { BaseServiceAbstract } from "@app/share";
import { ClubModel } from "./club.schema";
import { ClubsRepository } from "./clubs.repository";

@Injectable()
export class ClubsService extends BaseServiceAbstract<ClubModel> {
  constructor(private repo: ClubsRepository) {
    super(repo);
  }
}
