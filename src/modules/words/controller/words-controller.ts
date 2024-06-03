import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { WordsService } from '../services/words.service';
import { Response } from 'express';

@Controller()
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Get()
  public async getWord(@Param() word: string, @Res() res: Response) {
    const wordFound = await this.wordsService.getWord(word);
    return res.status(HttpStatus.OK).json({ message: 'Ok', wordFound });
  }
}
