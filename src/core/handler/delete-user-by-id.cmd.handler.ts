import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { IUserRepository } from 'src/domain/user.interface';
import { CLIENTS, User_Deleted } from 'vtonomy';
import { DeleteUserByIdCommand } from '../command';

@CommandHandler(DeleteUserByIdCommand)
export class DeleteUserByIdHandler
  implements ICommandHandler<DeleteUserByIdCommand>
{
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject(CLIENTS.Search_Client) private readonly searchService: ClientProxy,
  ) {}
  async execute(command: DeleteUserByIdCommand): Promise<void> {
    const id = command.id;

    try {
      await this.userRepository.deleteById(id);
      this.searchService.send(User_Deleted, { id }).subscribe();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
