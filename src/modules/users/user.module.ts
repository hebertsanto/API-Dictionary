import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users-controllers';
import { UserService } from './services/users.service';
import { DatabaseModule } from '../mongo/database.module';
import { usersProvider } from './users-provider';
import { Logger } from 'src/config/logger';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserService, ...usersProvider, Logger],
})
export class UsersModule {}
