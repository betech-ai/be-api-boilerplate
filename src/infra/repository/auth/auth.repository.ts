import { Injectable, Provider } from '@nestjs/common';
import { DeleteTokenInput, IAuthRepository } from '../../../domain/auth/auth.repository.i';
import { RedisService } from '../../redis/redis.service';

@Injectable()
class Repository implements IAuthRepository {
  constructor(private readonly redisService: RedisService) {}

  public async getTokenByUserId(userId: string): Promise<string> {
    return this.redisService.client.get(userId);
  }

  public async getUserIdByToken(token: string): Promise<string> {
    return this.redisService.client.get(token);
  }

  public async setToken(userId: string, token: string): Promise<void> {
    await Promise.all([
      this.redisService.client.set(userId, token),
      this.redisService.client.set(token, userId)
    ]);
  }

  public async deleteToken({ userId, token }: DeleteTokenInput): Promise<void> {
    if (userId) {
      const currentToken = await this.redisService.client.get(userId);
      await Promise.all([
        this.redisService.client.del(userId),
        this.redisService.client.del(currentToken)
      ]);
    } else if (token) {
      const currentUserId = await this.redisService.client.get(token);
      await Promise.all([
        this.redisService.client.del(currentUserId),
        this.redisService.client.del(token)
      ]);
    }
  }
}

export const AuthRepository: Provider = {
  provide:  'AuthRepository',
  useClass: Repository,
};
