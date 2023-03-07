import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Config } from '../../../app/config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: Config) {
    super({
      jwtFromRequest:   ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:      config.auth.jwt.secret,
    });
  }

  public async validate(payload: any): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iat, exp, ...res } = payload;
    return res;
  }
}
