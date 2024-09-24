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
// income
routes.post('/income-statement', OrderController.getIncomeStatement);
// due detials
routes.get('/due-details', OrderController.getDueDetails);
routes.get('/', OrderController.getAllOrder);
routes.get('/:oid', OrderController.getSIngle);
routes.patch('/:id', OrderController.updateOrder);
routes.get('/invoice/:oid', OrderController.getInvoice);
routes.patch(
  '/dewCollection/:oid',
  auth(
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.MANAGE_ORDER
  ),
  OrderController.dueCollection
);
routes.post(
  '/statusChange/:oid',
  auth(
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.MANAGE_ORDER
  ),
  OrderController.statusChanger
);

export const OrderRoutes = { routes };
