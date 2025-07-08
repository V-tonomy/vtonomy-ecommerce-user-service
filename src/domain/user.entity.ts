import { EUserRole } from 'src/core/dto/user.dto';
import { IUser } from './user.interface';

export class User implements IUser {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: EUserRole,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
