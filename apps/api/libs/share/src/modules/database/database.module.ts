import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { logExecutionTime } from "mongoose-execution-time";
import mongoose, { mongo } from "mongoose";
import { MongoDBConfigType } from "../configuration/configs/mongodb.config";
import { CONFIG_DEFAULT, CONFIG_KEYS } from "../../common/constants";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        mongoose.plugin(logExecutionTime);

        const mongoDBConfig = configService.get<MongoDBConfigType>(
          CONFIG_KEYS.MONGODB
        );

        return {
          uri: mongoDBConfig?.uri ?? CONFIG_DEFAULT.MONGODB_URI
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
