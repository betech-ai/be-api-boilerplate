import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService, private userService: UserService) {
    super();
  }

  public async validate({ body }): Promise<User> {
    let user = await this.authService.validateUser(body.deviceId);
    if (!user) {
      user = await this.userService.create({ deviceId: body.deviceId });
    }

    return user;
  }
}
