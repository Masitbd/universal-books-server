import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { HospitalGroupController } from './hospitalGroup.controller';
import { hospitalGrouptValidation } from './hospitalGroup.validation';

const routes = express.Router();

routes.post(
  '/create-hospitalGroup',
  validateRequest(hospitalGrouptValidation.createHospitalGroupZodSchema),
  HospitalGroupController.createHospitalGroup
);
routes.get('/:id', HospitalGroupController.getSingleHospitalGroup);
routes.get('/', HospitalGroupController.getAllHospitalGroup);
routes.patch(
  '/:id',
  validateRequest(hospitalGrouptValidation.updateHospitalGroupZodSchema),
  HospitalGroupController.updateHospitalGroup
);
routes.delete('/:id', HospitalGroupController.deleteHospitalGroup);

export const HospitalGroupRoutes = { routes };
