import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, RabbitmqModule } from 'vtonomy';
import { USER_HANDLER } from './core';
import { UserSchema } from './domain/user.schema';
import { UserRepository } from './infras/user.repository';
import { UserController } from './infras/user.transport';

@Module({
  imports: [
    CqrsModule,
    RabbitmqModule,
    JwtModule.register({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    ...USER_HANDLER,
  ],
})
export class UserModule {}
