import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { WordsService } from '../services/words.service';
import { Response } from 'express';
import { SkipAuth } from 'src/modules/auth/skip-auth.decorator';
import { Logger } from 'src/config/logger';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Entries')
@Controller('entries')
export class WordsController {
  constructor(
    private wordService: WordsService,
    private logger: Logger,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve data about a word',
  })
  @Get('/:word')
  public async getWord(@Param('word') word: string, @Res() res: Response) {
    const wordFound = await this.wordService.getWord(word);
    return res.status(HttpStatus.OK).json({ message: 'Ok', wordFound });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Populate database',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal  server error',
  })
  @Post('/populate')
  public async populateDatabse(@Res() res: Response) {
    this.logger.log('In progress...');
    console.time();
    await this.wordService.populateDatabase();
    console.timeEnd();
    this.logger.log('Populated.');
    return res.status(HttpStatus.CREATED).json({ message: 'Everything ok' });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return words with pagination',
  })
  @SkipAuth()
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 40,
    @Res() res: Response,
  ): Promise<Response> {
    const results = await this.wordService.findAll(page, limit);
    return res.status(HttpStatus.OK).json({ results });
  }
}
