import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth-controller';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../users/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { env } from 'src/config/env';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: env.SECRET_JWT,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
