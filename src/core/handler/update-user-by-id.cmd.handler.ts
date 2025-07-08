import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { IUserRepository } from 'src/domain/user.interface';
import { CLIENTS, User_Updated } from 'vtonomy';
import { UpdateUserByIdCommand } from '../command';

@CommandHandler(UpdateUserByIdCommand)
export class UpdateUserByIdHandler
  implements ICommandHandler<UpdateUserByIdCommand>
{
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject(CLIENTS.Search_Client) private readonly searchService: ClientProxy,
  ) {}

  async execute(command: UpdateUserByIdCommand): Promise<any> {
    const props = command.props;
    const id = command.id;

    const existed = await this.userRepository.findById(id);
    if (!existed) {
      throw new NotFoundException(`User with id: '${id}' does not exist`);
    }

    const isSuccess = await this.userRepository.updateById(id, props);
    this.searchService.send(User_Updated, { id, props }).subscribe();
    return isSuccess;
  }
}
