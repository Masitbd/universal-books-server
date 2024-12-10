import { IComment } from './comment.interface';
import { Comment } from './comment.model';

const post = async (params: IComment) => {
  return await Comment.create(params);
};

const patch = async (params: IComment, id: string) => {
  return await Comment.findOneAndUpdate({ _id: id }, params);
};

const reomve = async (params: string) => {
  return await Comment.findOneAndDelete({ _id: params });
};

const fetch = async () => {
  return Comment.find();
};

const fetchSingle = async (params: string) => {
  return Comment.findOne({ _id: params });
};

export const CommentService = {
  post,
  patch,
  reomve,
  fetch,
  fetchSingle,
};
