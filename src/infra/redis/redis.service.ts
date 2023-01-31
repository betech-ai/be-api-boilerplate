import { Injectable } from '@nestjs/common';
import IORedis, { Redis } from 'ioredis';
import { Config } from '../../app/config/config';
import { HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class RedisService {
  public redisConfig: Config['redis'];
  public client: Redis;

  constructor(private config: Config) {
    this.redisConfig = this.config.redis;

    this.client = new IORedis({
      port: this.redisConfig.port,
      host: this.redisConfig.host,
      db: this.redisConfig.db,
    });
  }

  public async healthCheck(): Promise<HealthIndicatorResult> {
    const ping = await this.client.ping();

    if (ping === 'PONG') {
      return {
        redis: {
          status: 'up',
        },
      };
    } else {
      return {
        redis: {
          status: 'down',
        },
      };
    }
  }
}
