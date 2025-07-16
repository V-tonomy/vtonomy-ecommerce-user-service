import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { User } from 'src/domain/user.entity';
import { IUserRepository } from 'src/domain/user.interface';
import { CLIENTS, User_Created } from 'vtonomy';
import { CreateUserCommand } from '../command/create-user.cmd';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject(CLIENTS.Search_Client) private readonly searchService: ClientProxy,
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const { name, email, password, role, phone } = command.props;
    const id = randomUUID();

    const newUser = new User(
      id,
      name,
      email,
      false,
      phone,
      false,
      password,
      role,
      true,
      new Date(),
      new Date(),
    );

    try {
      await this.userRepository.insert(newUser);
    } catch (err) {
      console.log(err)
      throw err
    }
    this.searchService.send(User_Created, newUser).subscribe();
    return id;
  }
}
