import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable({})
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAllUser(params: any): Promise<any> {
    try {
      const { contact, name, limit, page, email } = params;
      let query = this.userRepository
        .createQueryBuilder('user')
        .leftJoin('order', 'order', 'order.userId = user.id')
        .select('user.id', 'id')
        .addSelect('user.firstname', 'firstname')
        .addSelect('user.middlename', 'middlename')
        .addSelect('user.lastname', 'lastname')
        .addSelect('user.roles', 'roles')
        .addSelect('user.email', 'email')
        .addSelect('user.contact', 'contact')
        .addSelect('user.created_at', 'created_at')
        .addSelect('user.updated_at', 'updated_at')
        .addSelect('user.is_active', 'is_active')
        .addSelect('user.picture', 'picture');

      if (name) {
        query = query.andWhere('user.firstname ILIKE :name', {
          name: `${name}%`,
        });
      }
      if (email) {
        query = query.andWhere('user.email ILIKE :email', {
          email: `${email}%`,
        });
      }
      if (contact) {
        query = query.andWhere('user.contact ILIKE :contact', {
          contact: `${contact}%`,
        });
      }

      //pagination logic: based on page and limit
      if (page && limit) {
        const skip = (page - 1) * limit;
        query = query.limit(limit).offset(skip);
      }

      const users = await query.getRawMany();

      return users;
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }
  async getMyProfile(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
        select: ['id', 'firstname', 'lastname', 'contact', 'email', 'username'],
      });
      return user;
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async updateUser(email: string, args: any) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: ILike(email) },
      });

      if (!user) {
        throw new NotFoundException(`email ${email} not found .`);
      }
      Object.assign(user, args);
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`user with an id ${id} not found`);
      }

      await this.userRepository.remove(user);
      return {
        status: 'success',
      };
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  async verifyEmailAndUpdatePassword(
    email: string,
    forgotPasswordOtp: string,
    password: string,
  ) {
    try {
      const user = await this.findByIdOrEmail(email);

      if (!user) {
        throw new HttpException(
          `user with email ${email} doesn't exists !`,
          404,
        );
      }

      if (user.forgot_password_otp !== forgotPasswordOtp) {
        throw new NotAcceptableException('otp doesnot match');
      }

      if (user.forgot_password_expiry < new Date()) {
        throw new RequestTimeoutException(
          'otp time expired , please generate new one .',
        );
      }
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(password, salt);

      Object.assign(user, {
        password: hashedPassword,
        forgotPasswordOtp: null,
        forgotPasswordExpiry: null,
      });
      await this.userRepository.save(user);
    } catch (err) {
      throw err.status == undefined
        ? new InternalServerErrorException(err)
        : new HttpException(err, err.status);
    }
  }

  // Helper functions :
  async findByIdOrEmail(
    email?: string,
    id?: number,
  ): Promise<User | undefined> {
    if (email) {
      return await this.userRepository.findOne({
        where: {
          email: ILike(email),
        },
      });
    }
    if (id) {
      return await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
    }
    return null;
  }
}
