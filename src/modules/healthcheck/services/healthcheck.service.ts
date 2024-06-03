import { Injectable } from '@nestjs/common';
import { HealthDTO } from '../health.dto';
import { Logger } from 'src/config/logger';

@Injectable()
export class HealthcheckService {
  constructor(private readonly logger: Logger) {}
  public status(status: HealthDTO) {
    this.logger.log('Returning status correcly');
    return { status };
  }
}
