import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BacteriaController } from './bacteria.controller';
import { BacteriaValidation } from './bacteria.validation';

const routes = express.Router();

routes.get('/', BacteriaController.getAllBacteria);

routes.post(
  '/',
  validateRequest(BacteriaValidation.bacteriaValidator),
  BacteriaController.createBacteria
);

routes.get('/:id', BacteriaController.getSingleBacteria);

routes.patch(
  '/:id',
  validateRequest(BacteriaValidation.bacteriaValidatorForPatch),
  BacteriaController.updateBacteria
);

routes.delete('/:id', BacteriaController.deleteBacteria);

export const BacteriaRoutes = { routes };
