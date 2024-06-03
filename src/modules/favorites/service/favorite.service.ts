import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Logger } from 'src/config/logger';

interface FavoriteWord extends Document {
  readonly userId: string;
  readonly wordId: string;
}

@Injectable()
export class FavoriteWordService {
  constructor(
    @Inject('FavoriteWordModel') private favoriteWord: Model<FavoriteWord>,
    private readonly logger: Logger,
  ) {}

  public async addFavorite(word_id: string, user_id: string) {
    const add = await this.favoriteWord.create(word_id, user_id);
    this.logger.log('Word was added sucessfuly');
    return add;
  }

  public async removeFavorite(word_id: string): Promise<void> {
    await this.favoriteWord.findByIdAndDelete(word_id);
    this.logger.log('Word was removed');
  }

  public async findAllFavorites(user_id: string) {
    const allFavorites = await this.favoriteWord.find({ user_id });
    this.logger.log('All favorites ');

    return allFavorites;
  }
}
