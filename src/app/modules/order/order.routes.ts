import express from 'express';
import { OrderController } from './order.controller';

const routes = express.Router();

routes.post('/', OrderController.createNewOrder);
routes.get('/', OrderController.getAllOrder);
routes.get('/:oid', OrderController.getSIngle);
routes.patch('/:id', OrderController.updateOrder);
routes.get('/invoice/:oid', OrderController.getInvoice);
routes.patch('/dewCollection/:oid', OrderController.dueCollection);
routes.post('/statusChange/:oid', OrderController.statusChanger);

export const OrderRoutes = { routes };
