import express from 'express';
import { MiscellaneousController } from './miscellaneous.controller';

const routes = express.Router();

routes.post('/', MiscellaneousController.create);
routes.get('/:id', MiscellaneousController.getSingle);
routes.get('/', MiscellaneousController.getAll);
routes.patch('/:id', MiscellaneousController.update);
routes.delete('/:id', MiscellaneousController.remove);

export const MiscellaneousRoutes = { routes };
