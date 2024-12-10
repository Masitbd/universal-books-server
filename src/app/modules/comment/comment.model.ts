import { model, Schema } from 'mongoose';
import { IComment } from './comment.interface';

const commentSchema = new Schema<IComment>({
  title: {
    type: String,
  },
  comment: {
    type: String,
  },
});

export const Comment = model('Comment', commentSchema);
