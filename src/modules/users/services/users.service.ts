import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDTO } from '../user-dto';
import { Logger } from 'src/config/logger';

interface User extends Document {
  readonly name: string;
  readonly email: string;
}

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModel') private userModel: Model<User>,
    private readonly logger: Logger,
  ) {}

  public async create(userDTO: UserDTO): Promise<User> {
    const user = await this.userModel.create(userDTO);
    this.logger.log('[UserService] : Creating user...');
    return user;
  }
}
