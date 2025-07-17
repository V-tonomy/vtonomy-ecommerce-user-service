import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENTS, JwtModule } from 'vtonomy';
import { USER_HANDLER } from './core';
import { UserSchema } from './domain/user.schema';
import { UserRepository } from './infras/user.repository';
import { UserController } from './infras/user.transport';

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ClientsModule.register([
      {
        name: CLIENTS.Search_Client,
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672',
          ],
          queue: 'search_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: CLIENTS.Mail_Client,
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672',
          ],
          queue: 'notification_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: CLIENTS.Auth_Client,
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672',
          ],
          queue: 'auth_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
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
