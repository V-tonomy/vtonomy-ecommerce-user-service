import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENTS, CoreModule, JwtAuthGuard } from 'vtonomy';
import { USER_HANDLER } from './core';
import { UserSchema } from './domain/user.schema';
import { UserRepository } from './infras/user.repository';
import { UserController } from './infras/user.transport';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forRoot(process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ClientsModule.register([
      {
        name: CLIENTS.Search_Client,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672'],
          queue: 'search_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: CLIENTS.Mail_Client,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672'],
          queue: 'mail_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: CLIENTS.Auth_Client,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    ...USER_HANDLER,
  ],
})
export class UserModule {}
