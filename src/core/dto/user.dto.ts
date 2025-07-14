import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum EUserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(EUserRole)
  role: EUserRole;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  isEmailVerified?: boolean;

  @IsOptional()
  phone?: string;

  @IsOptional()
  isPhoneVerified?: boolean;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(EUserRole)
  role?: EUserRole;
}

export class LoginDTO {
  email: string;
  role: EUserRole;
}
