import { Module } from '@nestjs/common';
import { HealthcheckController } from './controllers/health-controller';
import { HealthcheckService } from './services/healthcheck.service';
import { Logger } from 'src/config/logger';

@Module({
  imports: [],
  controllers: [HealthcheckController],
  providers: [HealthcheckService, Logger],
})
export class HealthModule {}
