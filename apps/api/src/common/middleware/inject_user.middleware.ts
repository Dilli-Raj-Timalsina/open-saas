import { NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

export class InjectUserMiddlware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  use(req: any, _res: Response, next: NextFunction) {
    req.userRepository = this.userRepository;
    next();
  }
}
