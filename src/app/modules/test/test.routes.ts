import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TestController } from './test.controller';
import { TestValidtion } from './test.validator';
const routes = express.Router();

routes.post(
  '/',
  validateRequest(TestValidtion.testValidator),
  TestController.createNewTest
);
routes.get('/', TestController.getAllTest);
routes.get('/:id', TestController.getSingleTest);
routes.patch(
  '/:id',
  validateRequest(TestValidtion.testValidatorForPatch),
  TestController.updateTest
);
routes.delete('/:id', TestController.removeTest);
export const TestRoutes = { routes };
