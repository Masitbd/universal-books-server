import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PdrvController } from './pdrv.controller';
import { PdrvValidation } from './pdrv.validatotion';
const routes = express.Router();

routes.get('/', PdrvController.getAllPdrv);

routes.post(
  '/',
  validateRequest(PdrvValidation.pdrvValidator),
  PdrvController.createPdrv
);

routes.get('/:id', PdrvController.getSinglePdrv);

routes.patch(
  '/:id',
  validateRequest(PdrvValidation.pdrvValidatorForPatch),
  PdrvController.updatePdrv
);

routes.delete('/:id', PdrvController.deletePdrv);

export const PdrvRoutes = { routes };
