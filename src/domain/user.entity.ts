import { EUserRole } from 'src/core/dto/user.dto';
import { IUser } from './user.interface';

export class User implements IUser {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly isEmailVerified: boolean,
    public readonly phone: string,
    public readonly isPhoneVerified: boolean,
    public readonly password: string,
    public readonly role: EUserRole,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
