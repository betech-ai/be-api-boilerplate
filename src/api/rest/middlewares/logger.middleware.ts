import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private prefix: string;
  private counter = 0;

  constructor(private logger: Logger) {
    this.prefix = Math.random().toString(36).toUpperCase().substr(-4);
  }
  use(req: Request, res: Response, next: NextFunction) {
    this.counter += 1;
    const count = this.counter.toString(36).toUpperCase().padStart(6, '0');

    const reqId = `${this.prefix}_${count}`;
    const reqCreatedAt = Date.now();

    this.logger.debug(
      JSON.stringify({
        query:   JSON.stringify(req.query),
        params:  JSON.stringify(req.params),
        body:    String(JSON.stringify(req.body)).substr(0, 1000),
        headers: String(JSON.stringify(req.headers)).substr(0, 1000),
      }),
      `${reqId} ${req.method} ${req.path} - Request <<<`,
    );

    res.on('finish', () => {
      if (res.statusCode >= 500) {
        this.logger.error(
          JSON.stringify({
            method:        req.method,
            path:          req.path,
            result:        'FAIL',
            statusCode:    res.statusCode,
            contentLength: res.getHeader('content-length') || 0,
            duration:      Date.now() - reqCreatedAt,
          }),
          `${reqId} ${req.method} ${req.path} - Response >>>`,
        );
      } else if (res.statusCode >= 400) {
        this.logger.warn(
          JSON.stringify({
            method:        req.method,
            path:          req.path,
            result:        'ERROR',
            statusCode:    res.statusCode,
            contentLength: res.getHeader('content-length') || 0,
            duration:      Date.now() - reqCreatedAt,
          }),
          `${reqId} ${req.method} ${req.path} - Response >>>`,
        );
      } else {
        this.logger.log(
          JSON.stringify({
            method:        req.method,
            path:          req.path,
            result:        'OK',
            statusCode:    res.statusCode,
            contentLength: res.getHeader('content-length') || 0,
            duration:      Date.now() - reqCreatedAt,
          }),
          `${reqId} ${req.method} ${req.path} - Response >>>`,
        );
      }
    });

    next();
  }
}
