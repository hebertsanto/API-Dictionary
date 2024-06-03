import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
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
  @Post('/favorite')
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
}
