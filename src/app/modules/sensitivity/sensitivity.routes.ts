import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SensitivityController } from './sensitivity.controllers';
import { sensitivityValidation } from './sensitivity.validation';
const routes = express.Router();

// Routes for getting all the sensitivity
routes.get('/', SensitivityController.getAllSensitivity);

// Route for creating new sensitivity
routes.post(
  '/',
  validateRequest(sensitivityValidation.sensitivityValidator),
  SensitivityController.createSensitivity
);

// Routes for getting a single sensitivity
routes.get('/:id', SensitivityController.getSingleSensitivity);
// Route for Editing existing sensitivity
routes.patch(
  '/:id',
  validateRequest(sensitivityValidation.sensitivityValidatorForPatch),
  SensitivityController.updateSensitivity
);

// Routes for deleting a sensitivity
routes.delete('/:id', SensitivityController.deleteSensitivity);

export const SensitivityRoutes = { routes };
