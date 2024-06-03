import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { WordsService } from '../services/words.service';
import { Response } from 'express';
import { SkipAuth } from 'src/modules/auth/skip-auth.decorator';

@Controller('entries')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @SkipAuth()
  @Get('/:word')
  public async getWord(@Param('word') word: string, @Res() res: Response) {
    const wordFound = await this.wordsService.getWord(word);
    return res.status(HttpStatus.OK).json({ message: 'Ok', wordFound });
  }
}
