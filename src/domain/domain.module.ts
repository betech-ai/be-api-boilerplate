import { Module } from '@nestjs/common';
import { RepositoryModule } from '../infra/repository/repository.module';

@Module({
  imports: [
    RepositoryModule,
    // Add here new domain modules
  ],
  exports: [
    // Add here new domain modules
  ],
})
export class DomainModule {}
