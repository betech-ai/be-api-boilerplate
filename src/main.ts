// eslint-disable-next-line @typescript-eslint/no-var-requires
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Config } from './app/config/config';
import { HttpExceptionFilter } from './app/HttpExceptionFilter';
import { setup as setupSwagger } from './app/swagger/setup';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.NODE_ENV !== 'local' || require('dotenv').config();

async function bootstrap() {
  const config = new Config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    json({
      limit: config.web.bodyLimit,
    }),
  );
  app.use(urlencoded({ extended: true, limit: config.web.bodyLimit }));

  app.use(helmet());

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:        true,
      transform:        true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(config.web.port);
}
bootstrap();
