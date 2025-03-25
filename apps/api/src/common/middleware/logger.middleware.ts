import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.query, 'req.query');
    console.log(req.body, 'req.body');
    console.log(req.params, 'req.params');
    next();
  }
}
