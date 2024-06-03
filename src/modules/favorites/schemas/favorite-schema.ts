import * as mongoose from 'mongoose';

export const FavoriteWordSchema = new mongoose.Schema({
  wordId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
