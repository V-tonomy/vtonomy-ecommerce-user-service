import { ICommand } from '@nestjs/cqrs';
import { UpdateUserDTO } from '../dto/user.dto';

export class UpdateUserByIdCommand implements ICommand {
  id: string;
  props: UpdateUserDTO;

  constructor(id: string, props: UpdateUserDTO) {
    this.id = id;
    this.props = props;
  }

  static create(id: string, props: UpdateUserDTO) {
    return new UpdateUserByIdCommand(id, props);
  }
}
