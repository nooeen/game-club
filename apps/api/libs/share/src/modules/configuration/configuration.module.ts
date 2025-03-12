import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { buildMongoDBConfig } from "./configs/mongodb.config";
import { mongodbConfigSchema } from "./schemas/mongodb.schema";
import { CONFIG_DEFAULT } from "@app/share/common/constants";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [
        buildMongoDBConfig,
      ],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test", "provision", "staging")
          .default("development"),
        PORT: Joi.number().default(CONFIG_DEFAULT.PORT),
        ...mongodbConfigSchema(true), // MONGODB & DB CACHE
      }),
    }),
  ],
})
export class ConfigurationModule {}
