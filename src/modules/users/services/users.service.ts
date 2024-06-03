import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDTO } from '../user-dto';

interface User {
  name: string;
  email: string;
}

export class UserService {
  constructor(@Inject('UserModel') private userModel: Model<User>) {}

  public async create(userDTO: UserDTO): Promise<User> {
    const user = await this.userModel.create(userDTO);
    return user;
  }
}
