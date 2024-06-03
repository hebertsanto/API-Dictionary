import { Module } from '@nestjs/common';
import { HealthModule } from '../healthcheck/health.module';

@Module({
  imports: [HealthModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
