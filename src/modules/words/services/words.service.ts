import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { Logger } from 'src/config/logger';

@Injectable()
export class WordsService {
  constructor(
    private httpService: HttpService,
    private readonly logger: Logger,
  ) {}

  public async getWord(word: string): Promise<any> {
    try {
      const request = this.httpService.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );

      const response = await firstValueFrom(request);
      this.logger.log('Request was success...');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(
          'An unknown error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  public async addFavorite(word: string) {
    console.log(word);
  }

  public async removeFavorite(word: string) {
    console.log(word);
  }
}
