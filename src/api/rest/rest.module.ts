import { Module } from '@nestjs/common';
import { DomainModule } from '../../domain/domain.module';
import { HealthController } from './controllers/health/health.controller';

@Module({
  imports:     [DomainModule],
  controllers: [
    HealthController,
  ],
})
export class RestModule { }
