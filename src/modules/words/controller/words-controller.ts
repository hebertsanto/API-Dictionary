import { Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { WordsService } from '../services/words.service';
import { Response } from 'express';
import { SkipAuth } from 'src/modules/auth/skip-auth.decorator';
import { Logger } from 'src/config/logger';
import { ApiResponse } from '@nestjs/swagger';

@Controller('entries')
export class WordsController {
  constructor(
    private wordsService: WordsService,
    private logger: Logger,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve data about a word',
  })
  @Get('/:word')
  public async getWord(@Param('word') word: string, @Res() res: Response) {
    const wordFound = await this.wordsService.getWord(word);
    return res.status(HttpStatus.OK).json({ message: 'Ok', wordFound });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Populate database',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @SkipAuth()
  @Post('/populate')
  public async populateDatabse(@Res() res: Response) {
    this.logger.log('In progress...');
    console.time();
    await this.wordsService.populateDatabase();
    console.timeEnd();
    this.logger.log('Populated.');
    return res.status(HttpStatus.CREATED).json({ message: 'Everything ok' });
  }
}
