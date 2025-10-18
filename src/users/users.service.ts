import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Int32 } from 'typeorm';

@Injectable()
export class UserService {
  CreateUser(user: User) {}

  DeleteUser(id: Int32) {}
  UpdateUser(user: User) {}

  Removeuser(id: Int32) {}
}
