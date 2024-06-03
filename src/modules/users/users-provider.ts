import { Connection } from 'mongoose';
import { UserSchema } from './schema/users-schema';

export const usersProvider = [
  {
    provide: 'UserModel',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
