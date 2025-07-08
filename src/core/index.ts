import {
  CreateUserHandler,
  DeleteUserByIdHandler,
  GetUserByEmailHandler,
  UpdateUserByIdHandler,
} from './handler';

export * from './command';
export * from './query';

export const USER_HANDLER = [
  CreateUserHandler,
  GetUserByEmailHandler,
  UpdateUserByIdHandler,
  DeleteUserByIdHandler,
  GetUserByEmailHandler,
];
