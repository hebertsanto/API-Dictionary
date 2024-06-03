import { Connection } from 'mongoose';
import { FavoriteWordSchema } from './schemas/favorite-schema';

export const favoriteWordProvider = [
  {
    provide: 'UserModel',
    useFactory: (connection: Connection) =>
      connection.model('FavoriteWord', FavoriteWordSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
