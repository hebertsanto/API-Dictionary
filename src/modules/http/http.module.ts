import { Module } from '@nestjs/common';
import { HealthModule } from '../healthcheck/health.module';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [HealthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
