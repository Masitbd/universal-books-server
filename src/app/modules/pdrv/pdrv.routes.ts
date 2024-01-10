import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PdrvController } from './pdrv.controller';
import { PdrvValidation } from './pdrv.validatotion';
const routes = express.Router();

routes.get('/', PdrvController.fetchPdrv);

routes.post(
  '/',
  validateRequest(PdrvValidation.pdrvValidator),
  PdrvController.createPdrv
);

routes.get('/:id', PdrvController.fetchSinglePdrv);

routes.patch(
  '/:id',
  validateRequest(PdrvValidation.pdrvValidatorForPatch),
  PdrvController.editPdrv
);

routes.delete('/:id', PdrvController.removePdrv);

export const PdrvRoutes = { routes };
