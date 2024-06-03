import { Module } from '@nestjs/common';
import { WordsService } from './services/words.service';
import { WordsController } from './controller/words-controller';
import { HttpModule } from '@nestjs/axios';
import { Logger } from 'src/config/logger';
import { DatabaseModule } from '../mongo/database.module';
import { wordsProvider } from './words-provider';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [WordsController],
  providers: [WordsService, Logger, ...wordsProvider],
  exports: [],
})
export class WordsModule {}
