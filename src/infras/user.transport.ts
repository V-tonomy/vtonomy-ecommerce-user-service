import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { DeleteUserByIdCommand, UpdateUserByIdCommand } from 'src/core';
import { CreateUserCommand } from 'src/core/command/create-user.cmd';
import { CreateUserDTO, LoginDTO, UpdateUserDTO } from 'src/core/dto/user.dto';
import { GetUserByEmailQuery } from 'src/core/query';
import {
  MessageResponseDTO,
  ResponseDTO,
  User_Created,
  User_GetByEmail,
} from 'vtonomy';

@Controller('user')
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @MessagePattern(User_Created)
  public async handlerUserCreated(
    @Payload() data: CreateUserDTO,
    @Ctx() context: RmqContext,
  ) {
    try {
      const id = await this.commandBus.execute(CreateUserCommand.create(data));

      return { success: true, data: id };
    } catch (error) {
      return { success: false, error: error?.errorResponse?.errmsg || 'Error' };
    }
  }

  @MessagePattern(User_GetByEmail)
  public async handlerUserGetByEmail(
    @Payload() data: LoginDTO,
    @Ctx() context: RmqContext,
  ) {
    try {
      const user = await this.queryBus.execute(
        GetUserByEmailQuery.create(data),
      );
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error?.errorResponse?.errmsg || 'Error' };
    }
  }

  @Post('/')
  async insert(@Body() body: CreateUserDTO) {
    const id = await this.commandBus.execute(CreateUserCommand.create(body));
    return new ResponseDTO(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateUserDTO) {
    await this.commandBus.execute(UpdateUserByIdCommand.create(id, updateData));
    return new MessageResponseDTO(`Update user with id: ${id} success`);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.commandBus.execute(DeleteUserByIdCommand.create(id));
    return new MessageResponseDTO(`Delete user with id: ${id} success`);
  }
}
