import express from 'express';
import { VacuumTubeControllers } from './vacuumTube.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { VacuumTubeValidation } from './vacuumTube.validatorst';
const router = express.Router();

router.get('/', VacuumTubeControllers.getAllVacuumTube);

router.get('/:id', VacuumTubeControllers.getSingleVacuumTube);

router.post(
  '/',
  validateRequest(VacuumTubeValidation.VacuumTubeValidator),
  VacuumTubeControllers.createVacuumTube
);

router.patch(
  '/:id',
  validateRequest(VacuumTubeValidation.VacuumTubeValidatorForUpdate),
  VacuumTubeControllers.createVacuumTube
);

router.delete('/:id', VacuumTubeControllers.deleteVacuumTube);

export const VacuumRoutes = {
  router,
};
