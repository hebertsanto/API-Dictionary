import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth-controller';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
