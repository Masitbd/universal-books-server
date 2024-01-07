import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { sensitivity_controller } from './sensivity.controllers';
import { seinsitivity_validation } from './sintitivity.validators';
const router = express.Router();
router.post(
  '/sensitivity',
  validateRequest(seinsitivity_validation.sensitivity_validator),
  sensitivity_controller.create_sensitivity
);

export const sensivity_routes = { router };
