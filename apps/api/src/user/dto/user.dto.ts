import { PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsInt()
  contact?: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}

export class ConfirmOtpDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class UserResponseDto {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  roles: Array<string>;
  email: string;
  contact: string;
  picture: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class PartialUser extends PartialType(User) {}
export class UpdateUserDto extends PickType(PartialUser, [
  'firstname',
  'lastname',
  'contact',
  'is_active',
  'picture',
] as const) {}

export class UpdateUserContactDto {
  @IsString()
  contact: string;
}
