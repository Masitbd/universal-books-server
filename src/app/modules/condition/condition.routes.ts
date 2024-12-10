import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ConditionController } from './condition.controller';
import { ConditionValidation } from './condition.validation';
const routes = express.Router();

routes.post(
  '/',
  validateRequest(ConditionValidation.conditionValidator),
  ConditionController.createCondition
);
routes.get('/', ConditionController.getAllCondition);

routes.get('/:id', ConditionController.getSingleCondition);

routes.patch(
  '/:id',
  validateRequest(ConditionValidation.conditionValidator),
  ConditionController.updateCondition
);

routes.delete('/:id', ConditionController.deleteCondition);

export const ConditionRoutes = { routes };
