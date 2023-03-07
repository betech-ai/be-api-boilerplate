import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RedisModule } from '../redis/redis.module';
import { AuthRepository } from './auth/auth.repository';
import { UserRepository } from './user/user.repository';

@Module({
  imports:   [DatabaseModule, RedisModule],
  providers: [
    AuthRepository,
    UserRepository,
    // Add here new repositories
  ],
  exports: [
    AuthRepository,
    UserRepository,
    // Add here new repositories
  ],
})
export class RepositoryModule {}
