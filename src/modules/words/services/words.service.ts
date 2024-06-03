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
    @Inject('WordsModel') private wordModel: Model<WordsModel>,
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

      await this.wordModel.deleteMany({});

      await this.wordModel.insertMany(words.map((word) => ({ words: [word] })));

      this.logger.log('Populate database sucessfully');
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    results: string[];
    totalDocs: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    const skip = (page - 1) * limit;
    const totalDocs = await this.wordModel.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);
    const words = await this.wordModel.find().skip(skip).limit(limit);
    const results = words.map((word) => word.words).flat();

    return {
      results,
      totalDocs,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }
}
