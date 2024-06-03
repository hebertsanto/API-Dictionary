import { Module } from '@nestjs/common';
import { FavoriteWordController } from './controllers/favorite-controller';
import { FavoriteWordService } from './service/favorite.service';
import { DatabaseModule } from '../mongo/database.module';
import { Logger } from 'src/config/logger';
import { favoriteWordProvider } from './favorite-provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FavoriteWordController],
  providers: [FavoriteWordService, Logger, ...favoriteWordProvider],
})
export class FavoriteModule {}
