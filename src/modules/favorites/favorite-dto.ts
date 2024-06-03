import { IsString } from 'class-validator';

export class AddFavoriteDTO {
  @IsString()
  user_id: string;

  @IsString()
  word_id: string;
}
