import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { LoggerMiddleware } from '../api/rest/middlewares/logger.middleware';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [ApiModule, LoggerModule, ConfigModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
