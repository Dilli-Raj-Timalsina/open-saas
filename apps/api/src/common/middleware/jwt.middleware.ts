import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as cookie from 'cookie';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const cookieHeader = req.headers.cookie;

    let token: string | null = null;

    // Extract token from Authorization header
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    // Extract token from cookies
    if (!token && cookieHeader) {
      const cookies = cookie.parse(cookieHeader);
      token = cookies.yourTokenCookieName; // Replace with your actual cookie name
    }

    // Attach the token to the request for use in controllers or services
    req.jwt = token;

    next();
  }
}
