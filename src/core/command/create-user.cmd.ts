import { ICommand } from '@nestjs/cqrs';
import { CreateUserDTO } from '../dto/user.dto';

export class CreateUserCommand implements ICommand {
  public props: CreateUserDTO;

  constructor(props: CreateUserDTO) {
    this.props = props;
  }

  static create(props: CreateUserDTO) {
    return new CreateUserCommand(props);
  }
}
