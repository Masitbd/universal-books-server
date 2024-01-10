import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SensitivityController } from './sensitivity.controllers';
import { sensitivityValidation } from './sentitivity.validators';
const routes = express.Router();

// Routes for getting all the sensitivity
routes.get('/', SensitivityController.FetchSensitivity);

// Route for creating new sensitivity
routes.post(
  '/',
  validateRequest(sensitivityValidation.sensitivityValidator),
  SensitivityController.CreateSensitivity
);

// Routes for getting a single sensitivity
routes.get('/:id', SensitivityController.FetchSingleSensitivity);
// Route for Editing existing sensitivity
routes.patch(
  '/:id',
  validateRequest(sensitivityValidation.sensitivityValidatorForPatch),
  SensitivityController.EditSensitivity
);

// Routes for deleting a sensitivity
routes.delete('/:id', SensitivityController.RemoveSensitivity);

export const SensitivityRoutes = { routes };
