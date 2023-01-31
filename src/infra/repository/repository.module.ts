import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports:   [DatabaseModule, RedisModule],
  providers: [
    // Add here new repositories
  ],
  exports: [
    // Add here new repositories
  ],
})
export class RepositoryModule {}
