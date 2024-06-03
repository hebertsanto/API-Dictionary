import { Module } from '@nestjs/common';
import { WordsService } from './services/words.service';
import { WordsController } from './controller/words-controller';
import { HttpModule } from '@nestjs/axios';
import { Logger } from 'src/config/logger';

@Module({
  imports: [HttpModule],
  controllers: [WordsController],
  providers: [WordsService, Logger],
  exports: [],
})
export class WordsModule {}
