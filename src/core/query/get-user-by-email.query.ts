import { IQuery } from '@nestjs/cqrs';
import { LoginDTO } from '../dto/user.dto';

export class GetUserByEmailQuery implements IQuery {
  props: LoginDTO;
  constructor(props: LoginDTO) {
    this.props = props;
  }

  static create(props: LoginDTO) {
    return new GetUserByEmailQuery(props);
  }
}
