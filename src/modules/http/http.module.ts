import { Module } from '@nestjs/common';
import { HealthModule } from '../healthcheck/health.module';
import { UsersModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [HealthModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
