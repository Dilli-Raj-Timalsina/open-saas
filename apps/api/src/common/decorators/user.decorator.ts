import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 @returns request.user is assigned in AuthGuard by decoding jwt token , if no AuthGuard or jwt then no user as well .
 */

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
