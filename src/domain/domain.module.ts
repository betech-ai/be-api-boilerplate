import { Module } from '@nestjs/common';
import { RepositoryModule } from '../infra/repository/repository.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    RepositoryModule,
    AuthModule,
    UserModule,
    // Add here new domain modules
  ],
  exports: [
    AuthModule,
    UserModule,
    // Add here new domain modules
  ],
})
export class DomainModule {}
