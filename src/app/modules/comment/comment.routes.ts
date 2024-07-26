import express from 'express';
import { CommentController } from './comment.controller';
const routes = express.Router();
routes.post('/', CommentController.create);
routes.patch('/:id', CommentController.update);
routes.delete('/:id', CommentController.Remove);
routes.get('/', CommentController.getAll);
routes.get('/:id', CommentController.getsingle);

export const CommentRoutes = { routes };
