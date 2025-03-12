import { Injectable } from "@nestjs/common";
import { BaseRepositoryAbstract, COLLECTIONS } from "@app/share";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepositoryInterface } from "@app/share/base/database/base.repository.interface";
import { ClubModel } from "./club.schema";

@Injectable()
export class ClubsRepository
  extends BaseRepositoryAbstract<ClubModel>
  implements BaseRepositoryInterface<ClubModel> {
  constructor(
    @InjectModel(COLLECTIONS.CLUBS.SINGULAR)
    private readonly dbModel: Model<ClubModel>
  ) {
    super(dbModel);
  }
}
