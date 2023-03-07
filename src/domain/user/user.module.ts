import { Module } from '@nestjs/common';
import { RepositoryModule } from '../../infra/repository/repository.module';
import { UserService } from './user.service';

@Module({
  imports:   [RepositoryModule],
  providers: [UserService],
  exports:   [UserService],
})
export class UserModule {}
