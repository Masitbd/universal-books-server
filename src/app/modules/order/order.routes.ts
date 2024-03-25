import express from 'express';
import { OrderController } from './order.controller';
const routes = express.Router();

routes.post('/', OrderController.createNewOrder);
routes.get('/', OrderController.getAllOrder);
routes.patch('/:id', OrderController.updateOrder);

export const OrderRoutes = { routes };
