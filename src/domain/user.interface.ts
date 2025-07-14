import { EUserRole } from 'src/core/dto/user.dto';
import { IRepository } from 'vtonomy';

export interface IUser {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  phone: string;
  isPhoneVerified: boolean;
  password: string;
  role: EUserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPersistant {}

export interface IUserRepository extends IRepository<IUser, IUserPersistant> {}
