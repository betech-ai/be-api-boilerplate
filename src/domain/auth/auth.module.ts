import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../../app/config/config.module';
import { Config } from '../../app/config/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RepositoryModule } from '../../infra/repository/repository.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    RepositoryModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports:    [ConfigModule],
      useFactory: (config: Config) => ({
        secret:      config.auth.jwt.secret,
        signOptions: { expiresIn: config.auth.jwt.expiresIn },
      }),
      inject: [Config],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports:   [AuthService],
})
export class AuthModule {}
