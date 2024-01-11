import express from 'express';
import { VacuumTubeControllers } from './vacuumTube.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { VacuumTubeValidation } from './vacuumTube.validatorst';
const routes = express.Router();

routes.get('/', VacuumTubeControllers.getAllVacuumTube);

routes.get('/:id', VacuumTubeControllers.getSingleVacuumTube);

routes.post(
  '/',
  validateRequest(VacuumTubeValidation.VacuumTubeValidator),
  VacuumTubeControllers.createVacuumTube
);

routes.patch(
  '/:id',
  validateRequest(VacuumTubeValidation.VacuumTubeValidatorForUpdate),
  VacuumTubeControllers.createVacuumTube
);

routes.delete('/:id', VacuumTubeControllers.deleteVacuumTube);

export const VacuumRoutes = {
  routes,
};
