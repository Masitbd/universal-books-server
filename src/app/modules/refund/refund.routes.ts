import express from 'express';
import { RefundController } from './refund.controller';

const routes = express.Router();
routes.post('/', RefundController.create);
routes.get('/', RefundController.getAll);

export const RefundRoutes = { routes };
