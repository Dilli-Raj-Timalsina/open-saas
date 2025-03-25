import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { MyLogger } from '../logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new MyLogger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse() as { message: string };

    this.logger.warn('HTTP EXCEPTION !! 🛑🛑🛑🛑🛑🛑🛑');
    console.log(exception);
    this.logger.warn('*************************************');

    response.status(status).json({
      statusCode: status,
      message: message.message === undefined ? message : message.message,
      error: exception.name,
    });
  }
}
