import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ConditionController } from './condition.controller';
import { ConditionValidation } from './conditon.validation';
const routes = express.Router();

routes.post(
  '/',
  validateRequest(ConditionValidation.conditionValidator),
  ConditionController.createCondition
);
routes.get('/', ConditionController.fetchCondition);

routes.get('/:id', ConditionController.fetchCingleCondition);

routes.patch(
  '/:id',
  validateRequest(ConditionValidation.conditionValidator),
  ConditionController.updateCondition
);

routes.delete('/:id', ConditionController.removeCondition);

export const ConditionRoutes = { routes };
