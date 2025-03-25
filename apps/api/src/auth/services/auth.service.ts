import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as cookie from 'cookie';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/services/user.service';
import { generateUUID } from 'src/common/utils/create_uuid.util';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { LoginDto, SignUpDto } from 'src/user/dto/user.dto';
import { EMAIL_QUEUE_NAMES } from 'src/common/constants/email_types';
import { TPayload, TSignupPayload } from '..';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectQueue('email-queue') private emailQueue: Queue,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(body: SignUpDto) {
    try {
      const existingUser = await this.userService.findByIdOrEmail(body.email);
      if (existingUser) {
        throw new ConflictException(`email ${body.email} already exists .`);
      }
      const payload = {
        email: body.email.toLowerCase(),
        roles: ['user'],
        password: body.password,
        firstname: body.firstname,
        lastName: body.lastname,
      };
      const access_token = await this.jwtService.signAsync(payload);
      await this.emailQueue.add(
        EMAIL_QUEUE_NAMES.SIGNUP,
        {
          email: payload.email,
          firstname: payload.firstname,
          token: access_token,
        },
        {
          attempts: 2,
          removeOnComplete: true,
        },
      );
      return { status: 'success', access_token: access_token };
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async confirmSignup(user: TSignupPayload, res: Response) {
    try {
      const existingUser = await this.userService.findByIdOrEmail(user.email);

      if (existingUser) {
        throw new ConflictException(`email ${user.email} already exists`);
      }
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const newUser = this.userRepository.create({
        email: user.email,
      });

      const savedUser = await this.userRepository.save(newUser);
      const session_id = generateUUID(8);

      // push element at the end of list
      // await this.cacheManagerService
      //   .getClient()
      //   .rPush(`user:session:${savedUser.id}`, session_id);

      const payload = {
        id: savedUser.id,
        email: savedUser.email,
        roles: savedUser.contact,
        firstname: savedUser.firstname,
        lastname: savedUser.lastname,
        session_id: session_id,
      };

      const access_token = await this.jwtService.signAsync(payload);

      const refresh_token = await this.jwtService.signAsync(payload, {});

      res.cookie('jwt', access_token, {
        sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
        httpOnly: process.env.NODE_ENV === 'production',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 * 52,
        domain:
          process.env.NODE_ENV === 'development'
            ? 'localhost'
            : `nepsetrading.com`,
      });

      return {
        status: 'success',
        access_token: access_token,
      };
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async login(body: LoginDto, res: Response): Promise<any> {
    try {
      const user = await this.userService.findByIdOrEmail(body.email);
      if (!user) {
        throw new NotFoundException(
          `User with email ${body.email} not found .`,
        );
      }
      if (!(await this.comparePassword(body.password, user.password))) {
        throw new UnauthorizedException('Incorrect password or email');
      }
      // validate session id
      // const sessions = await this.cacheManagerService
      //   .getClient()
      //   .lRange(`user:session:${user.id}`, 0, -1);

      // if (
      //   sessions &&
      //   sessions.length == Number(process.env.MAX_PARALLEL_DEVICE)
      // ) {
      //   await this.cacheManagerService
      //     .getClient()
      //     .lPop(`user:session:${user.id}`);
      // }
      // const session_id = generateUUID(8);
      // await this.cacheManagerService
      //   .getClient()
      //   .rPush(`user:session:${user.id}`, session_id);

      const payload = {
        id: user.id,
        email: user.email,
        roles: user.role_id,
        firstName: user.firstname,
        lastName: user.lastname,
        // session_id: session_id,
      };
      const access_token = await this.jwtService.signAsync(payload);

      res.cookie('jwt', access_token, {
        sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
        httpOnly: process.env.NODE_ENV === 'production',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 * 52,
        domain:
          process.env.NODE_ENV === 'development'
            ? 'localhost'
            : `nepsetrading.com`,
      });

      return {
        status: 'success',
        access_token,
      };
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async logout(user: TPayload, res: Response) {
    try {
      // remove session_id from session list
      // await this.cacheManagerService
      //   .getClient()
      //   .lRem(`user:session:${user.id}`, 0, user.session_id);

      res.clearCookie('jwt', {
        sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
        httpOnly: process.env.NODE_ENV === 'production',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 * 52,
        domain:
          process.env.NODE_ENV === 'development'
            ? 'localhost'
            : `nepsetrading.com`,
      });

      return {
        status: 'success',
        message: 'logout succesfull',
      };
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async refreshToken(user: User, res: Response) {
    try {
      const existingUser = await this.userService.findByIdOrEmail(user.email);
      const payload = {
        id: existingUser.id,
        email: existingUser.email,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
      };

      const access_token = await this.jwtService.signAsync(payload);

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('jwt', access_token, {
          sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
          httpOnly: process.env.NODE_ENV === 'production',
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7 * 52,
          domain:
            process.env.NODE_ENV === 'development'
              ? 'localhost'
              : `nepsetrading.com`,
        }),
      );

      return {
        status: 'success',
        access_token,
      };
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async googleLogin(req: any, res: Response) {
    try {
      let existingUser = await this.userService.findByIdOrEmail(req.user.email);

      if (existingUser) {
        await this.userRepository.update(existingUser.id, {
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          email: req.user.email,
          picture: req.user.picture,
        });
      } else {
        existingUser = await this.userRepository.save({
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          email: req.user.email,
          picture: req.user.picture,
          password: generateUUID(),
          google: true,
        });
      }

      // validate session id
      // const sessions = await this.cacheManagerService
      //   .getClient()
      //   .lRange(`user:session:${existingUser.id}`, 0, -1);
      // 1;
      // if (
      //   sessions &&
      //   sessions.length == Number(process.env.MAX_PARALLEL_DEVICE)
      // ) {
      //   await this.cacheManagerService
      //     .getClient()
      //     .lPop(`user:session:${existingUser.id}`);
      // }
      // const session_id = generateUUID(8);
      // await this.cacheManagerService
      //   .getClient()
      //   .rPush(`user:session:${existingUser.id}`, session_id);

      //Note : before redirecting user to frontend app please make sure that we will attach proper cookie of jwt for future request
      const payload = {
        id: existingUser.id,
        email: existingUser.email,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        // session_id: session_id,
      };

      const access_token = await this.jwtService.signAsync(payload);

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('jwt', access_token, {
          sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
          httpOnly: process.env.NODE_ENV === 'production',
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7 * 52,
          domain:
            process.env.NODE_ENV === 'development'
              ? 'localhost'
              : `nepsetrading.com`,
        }),
      );

      res.redirect(
        `${
          process.env.NODE_ENV === 'development'
            ? process.env.FRONTEND_URL_DEV
            : process.env.FRONTEND_URL_PROD
        }/dashboard`,
      );
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async facebookLogin(req: any, res: Response) {
    try {
      const existingUser = await this.userService.findByIdOrEmail(
        req.user.email,
      );
      if (existingUser) {
        await this.userRepository.update(existingUser.id, {
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          email: req.user.email,
          picture: req.user.picture,
        });
      } else {
        await this.userRepository.save({
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          picture: req.user.picture,
          password: generateUUID(),
          google: true,
        });
      }
      const payload = {
        id: existingUser.id,
        email: existingUser.email,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
      };

      const access_token = await this.jwtService.signAsync(payload);

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('jwt', access_token, {
          sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
          httpOnly: process.env.NODE_ENV === 'production',
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7 * 52,
          domain:
            process.env.NODE_ENV === 'development'
              ? 'localhost'
              : `nepsetrading.com`,
        }),
      );
      res.redirect(
        `${
          process.env.NODE_ENV === 'development'
            ? process.env.FRONTEND_URL_DEV
            : process.env.FRONTEND_URL_PROD
        }/dashboard`,
      );
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async forgotPassword(email: string, res: Response) {
    try {
      const forgotPasswordOtp = (
        Math.floor(Math.random() * 900000) + 100000
      ).toString();
      const forgotPasswordExpiry = new Date(Date.now() + 2 * 600000);
      const user = await this.userService.updateUser(email, {
        forgotPasswordOtp: forgotPasswordOtp,
        forgotPasswordExpiry,
      });
      await this.emailQueue.add(
        EMAIL_QUEUE_NAMES.FORGOT_PASSWORD,
        {
          email: user.email,
          firstName: user.firstname,
          otp: forgotPasswordOtp,
        },
        {
          attempts: 2,
          removeOnComplete: true,
        },
      );

      const payload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      const access_token = await this.jwtService.signAsync(payload);

      res.cookie('jwt', access_token, {
        sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
        httpOnly: process.env.NODE_ENV === 'production',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 * 52,
        domain:
          process.env.NODE_ENV === 'development'
            ? 'localhost'
            : `nepsetrading.com`,
      });

      return {
        status: 'success',
        message: 'please check your email to verify otp',
        access_token,
      };
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async confirmPasswordChange(
    email: string,
    emailVerificationOtp: string,
    password: string,
  ) {
    try {
      await this.userService.verifyEmailAndUpdatePassword(
        email,
        emailVerificationOtp,
        password,
      );

      return {
        status: 'success',
        message: 'Password changed successfully, please login!',
      };
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByIdOrEmail(email);
    if (user && user.password === pass) {
      const {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        password,
        email_verification_expiry,
        email_verification_otp,
        forgot_password_expiry,
        forgot_password_otp,
        ...result
      } = user;
      return result;
    }
    return null;
  }

  private async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
