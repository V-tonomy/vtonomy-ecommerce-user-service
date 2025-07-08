import { EUserRole } from 'src/core/dto/user.dto';
import { IRepository } from 'vtonomy';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: EUserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPersistant {}

export interface IUserRepository extends IRepository<IUser, IUserPersistant> {}
