import { v4 as uuid } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user/user.repository.i';
import { User } from '../user/user.entity';
import { IAuthRepository } from './auth.repository.i';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    @Inject('AuthRepository') private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(deviceId: string) {
    const user = await this.userRepository.getByDeviceId(deviceId);
    if (!user) {
      return null;
    }
    return user;
  }

  public async login(user: User) {
    let refreshToken = await this.authRepository.getTokenByUserId(user.id);

    if (!refreshToken) {
      refreshToken = uuid();
      await this.authRepository.setToken(user.id, refreshToken);
    }

    return {
      accessToken: this.jwtService.sign({
        id:       user.id,
        deviceId: user.deviceId,
      }),
      refreshToken,
    };
  }
}
