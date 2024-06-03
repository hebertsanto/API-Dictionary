import { Connection } from 'mongoose';
import { WordSchema } from './schemas/word-schema';

export const wordsProvider = [
  {
    provide: 'WordsModel',
    useFactory: (connection: Connection) =>
      connection.model('Words', WordSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
