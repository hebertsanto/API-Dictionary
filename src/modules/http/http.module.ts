import { Module } from '@nestjs/common';
import { HealthModule } from '../healthcheck/health.module';
import { UsersModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';
import { WordsModule } from '../words/words.module';

@Module({
  imports: [HealthModule, UsersModule, AuthModule, WordsModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
