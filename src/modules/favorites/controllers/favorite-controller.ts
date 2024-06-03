import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { FavoriteWordService } from '../service/favorite.service';
import { AddFavoriteDTO } from '../favorite-dto';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('entries')
export class FavoriteWordController {
  constructor(private readonly favoriteWordService: FavoriteWordService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add a word to favorite list',
  })
  @Post('en/favorite')
  public async addFavorite(
    @Body() addWordDTO: AddFavoriteDTO,
    @Res() res: Response,
  ) {
    await this.favoriteWordService.addFavorite(
      addWordDTO.user_id,
      addWordDTO.word_id,
    );
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Added to favorites' });
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'All favorites words' })
  @Get('/favorite/:userId/all')
  public async getAllFavorites(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const allfavorites =
      await this.favoriteWordService.findAllFavorites(userId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Your favorites words', favorites: allfavorites });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Word removed sucessfully',
  })
  @Delete('/favorite/:wordId')
  public async removeFavorite(
    @Param('wordId') wordId: string,
    @Res() res: Response,
  ) {
    await this.favoriteWordService.removeFavorite(wordId);
    return res.status(HttpStatus.OK).json({ message: 'Word was removed' });
  }
}
