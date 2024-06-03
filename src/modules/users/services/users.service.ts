import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDTO } from '../user-dto';
import { Logger } from 'src/config/logger';
import * as bcrypt from 'bcrypt';

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
    try {
      const passwordHash = await bcrypt.hash(userDTO.password, 10);
      const user = await this.userModel.create({
        email: userDTO.email,
        password: passwordHash,
      });

      this.logger.log('[UserService] : Creating user...');
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Some error while create user');
    }
  }
}
