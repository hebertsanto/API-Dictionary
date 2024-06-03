import * as mongoose from 'mongoose';
import { env } from 'src/config/env';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(env.DATABASE_URL),
  },
];
