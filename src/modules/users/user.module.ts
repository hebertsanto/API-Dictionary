import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users-controllers';
import { UserService } from './services/users.service';
import { Logger } from 'src/config/logger';
import { DatabaseModule } from '../mongo/database.module';
import { usersProvider } from './users-provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserService, Logger, ...usersProvider],
})
export class UsersModule {}
