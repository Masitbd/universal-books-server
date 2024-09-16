import express from 'express';
import { ENUM_USER_PEMISSION } from '../../../enums/userPermissions';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';
const routes = express.Router();

routes.post(
  '/',
  auth(
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.MANAGE_ORDER
  ),
  OrderController.createNewOrder
);
routes.get('/', OrderController.getAllOrder);


// due detials
routes.get('/due-details', OrderController.getDueDetails);
// income
routes.post('/income-statement', OrderController.getIncomeStatement);

routes.get('/:oid', OrderController.getSIngle);

routes.patch('/:id', OrderController.updateOrder);
routes.get('/invoice/:oid', OrderController.getInvoice);
routes.patch('/dewCollection/:oid', OrderController.dueCollection);
routes.post('/statusChange/:oid', OrderController.statusChanger);

export const OrderRoutes = { routes };
