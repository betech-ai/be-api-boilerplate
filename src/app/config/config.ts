import { Injectable } from '@nestjs/common';
import { AbstractConfig } from './config.abstract';

const DEFAULT_WEB_PORT = 3000;
const DEFAULT_BODY_LIMIT = 1024 * 1024 * 10; // 10 MB

@Injectable()
export class Config extends AbstractConfig {
  public web = {
    port:      this.getNumber('WEB_PORT', DEFAULT_WEB_PORT),
    bodyLimit: this.getNumber('BODY_LIMIT', DEFAULT_BODY_LIMIT),
  };

  public redis = {
    host: this.getString('REDIS_HOST'),
    port: this.getNumber('REDIS_PORT'),
    db:   this.getNumber('REDIS_DB'),
  };

  public google = {
    googleClientId:     this.getString('GOOGLE_CLIENT_ID'),
    googleClientSecret: this.getString('GOOGLE_CLIENT_SECRET'),
  };

  public db = {
    url: this.getString('DATABASE_URL'),
  };

  public auth = {
    jwt: {
      secret:    this.getString('JWT_SECRET'),
      expiresIn: this.getString('JWT_EXPIRES_IN'),
    },
  };

}
