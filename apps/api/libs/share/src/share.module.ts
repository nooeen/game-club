import { Module } from '@nestjs/common';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { DatabaseModule } from './modules/database/database.module';
@Module({
  imports: [ConfigurationModule, DatabaseModule],
  exports: [],
})
export class ShareModule {}
