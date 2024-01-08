import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { sensitivity_controller } from './sensitivity.controllers';
import { seinsitivity_validation } from './sentitivity.validators';
const router = express.Router();

// Routes for getting all the sensitivity
router.get('/sensitivity', sensitivity_controller.fetch_sensitivity);

// Route for creating new sensitivity
router.post(
  '/sensitivity',
  validateRequest(seinsitivity_validation.sensitivity_validator),
  sensitivity_controller.create_sensitivity
);

// Routes for getting a single sensitivity
router.get('/sensitivity/:id', sensitivity_controller.fetch_single_sensitivity);
// Route for Editing existing sensitivity
router.patch(
  '/sensitivity/:id',
  validateRequest(seinsitivity_validation.sensitivity_validator_for_patch),
  sensitivity_controller.update_sensitivity
);

// Routes for deleting a sensitivity
router.delete('/sensitivity/:id', sensitivity_controller.remove_sensitivity);

export const sensivity_routes = { router };
