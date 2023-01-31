import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionResponse = (exception.getResponse() || {}) as Record<string, unknown>;

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      timestamp:  new Date().toISOString(),
      path:       request.url,
      ...exceptionResponse,
    });
  }
}
