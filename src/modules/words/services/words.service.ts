import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Logger } from 'src/config/logger';

interface WordsModel extends Document {
  readonly words: string[];
}

@Injectable()
export class WordsService {
  constructor(
    private httpService: HttpService,
    private readonly logger: Logger,
    @Inject('WordsModel') private wordsModel: Model<WordsModel>,
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

  async populateDatabase(): Promise<void> {
    try {
      const response$ = this.httpService.get(
        'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json',
      );

      const response = await firstValueFrom(response$);

      const wordsDictionary: Record<string, string> = response.data;

      const words: string[] = Object.keys(wordsDictionary);

      await this.wordsModel.deleteMany({});

      await this.wordsModel.insertMany(
        words.map((word) => ({ words: [word] })),
      );

      this.logger.log('Populate database sucessfully');
    } catch (error) {
      console.error('Failed to populate database:', error.message);
    }
  }
}
