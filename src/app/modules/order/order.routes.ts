import express from 'express';
import { OrderController } from './order.controller';
const routes = express.Router();

routes.post('/', OrderController.createNewOrder);

export const OrderRoutes = { routes };
