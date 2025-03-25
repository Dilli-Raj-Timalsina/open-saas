import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      // const res = context.switchToHttp().getResponse();
      const userRepository = request.userRepository;
      // const cacheManagerService = request.cacheManagerService;

      const token = this.extractToken(request);

      if (!token) {
        throw new UnauthorizedException(
          'please signup for this operation ( कृपया साइनअप गर्नुहोस्। ) !!',
        );
      }

      const payload: any = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      const requiredRoles =
        Reflect.getMetadata('roles', context.getHandler()) || [];

      //check if user have sufficient role
      if (!this.checkRoles(payload, requiredRoles)) {
        throw new ForbiddenException(`user doesn't have enough role !`);
      }

      // // verify session_id for single sign in
      // await this.verifySessionId(
      //   payload.session_id,
      //   payload.id,
      //   cacheManagerService,
      // );

      return true;
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  private checkRoles(payload: any, required_roles: string[]): boolean {
    let contains = false;
    required_roles.forEach((role) => {
      if (payload.roles.includes(role)) {
        contains = true;
      }
    });
    return contains;
  }

  private extractToken(request: Request): string | undefined {
    // First, try to get the token from the Authorization header
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const [type, token] = authHeader.split(' ');
      if (type === 'Bearer') {
        return token;
      }
    }
    // If the token is not in the Authorization header, check the cookies
    return request.cookies?.jwt;
  }

  private async verifySessionId(
    session_id: string,
    id: string,
    cacheManagerService: any,
  ): Promise<boolean> {
    const sessions = await cacheManagerService
      .getClient()
      .lRange(`user:session:${id}`, 0, -1);

    // if there is no session id in 3 length sized sessions array (it means new device is logged in ) and there won't be more than 3 sessions cz it will be poped in login
    if (
      sessions.length == Number(process.env.MAX_PARALLEL_DEVICE) &&
      sessions.indexOf(session_id) == -1
    ) {
      throw new HttpException(
        'too many logins from your account, please re-login !',
        401,
      );
    }
    // if sessions length less than max-parallel-device simply allow
    return true;
  }
}
