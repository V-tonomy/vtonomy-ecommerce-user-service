import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PORTS, QueueConfig } from 'vtonomy';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672',
      ],
      queue: 'user_queue',
      queueOptions: QueueConfig.User_Client,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? PORTS.User_Service);
}
bootstrap();
