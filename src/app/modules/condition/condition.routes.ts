import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { condition_controller } from './condition.controller';
import { condition_validation } from './conditon.validation';
const routes = express.Router();

// Route for creating new condition
routes.post(
  '/condition',
  validateRequest(condition_validation.condition_validator),
  condition_controller.create_condition
);

//Route for getting all the conditions
routes.get('/condition', condition_controller.fetch_condition);

// Routes for fetching a single condition
routes.get('/condition/:id', condition_controller.fetch_single_condition);

// Routes for patching a single condition
routes.patch(
  '/condition/:id',
  validateRequest(condition_validation.condition_validator_for_patch),
  condition_controller.update_condition
);

//Route for deleting a condition
routes.delete('/condition/:id', condition_controller.remove_condition);

export const condition_routes = { routes };
