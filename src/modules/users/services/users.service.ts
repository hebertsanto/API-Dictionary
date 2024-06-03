import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDTO } from '../user-dto';

interface User {
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModel') private userModel: Model<User>,
    private readonly logger: LoggerService,
  ) {}

  public async create(userDTO: UserDTO): Promise<User> {
    const user = await this.userModel.create(userDTO);
    this.logger.log('[UserService] : Creating user...');
    return user;
  }
}
