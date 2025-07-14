import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/user.entity';
import { UserDocument } from 'src/domain/user.schema';
import { MongoRepository } from 'vtonomy';

@Injectable()
export class UserRepository extends MongoRepository<User, UserDocument> {
  constructor(
    @InjectModel('User')
    model: Model<UserDocument>,
  ) {
    super(model);
  }

  toDomain(doc: UserDocument): User {
    return new User(
      doc._id,
      doc.name,
      doc.email,
      doc.isEmailVerified,
      doc.phone,
      doc.isPhoneVerified,
      doc.password,
      doc.role,
      doc.isActive,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  fromDomain(domain: User): UserDocument {
    return new this.model({
      _id: domain.id,
      name: domain.name,
      email: domain.email,
      isEmailVerified: domain.isEmailVerified,
      phone: domain.phone,
      isPhoneVerified: domain.isPhoneVerified,
      password: domain.password,
      role: domain.role,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    });
  }
}
