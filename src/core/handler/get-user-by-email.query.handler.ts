import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/domain/user.entity';
import { IUserRepository } from 'src/domain/user.interface';
import { GetUserByEmailQuery } from '../query';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}
  async execute(query: GetUserByEmailQuery): Promise<User | null> {
    const { email, role } = query.props;
    const user = await this.userRepository.findOne({ email, role });

    return user;
  }
}
