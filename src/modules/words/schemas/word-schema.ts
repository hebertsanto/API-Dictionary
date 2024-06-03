import * as mongoose from 'mongoose';

export const WordSchema = new mongoose.Schema({
  words: [{ type: String }],
});
