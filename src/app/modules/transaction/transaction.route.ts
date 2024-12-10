import express from 'express';
import { ENUM_USER_PEMISSION } from '../../../enums/userPermissions';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TranasctionController } from './transaction.controller';
import { TransactionValidtion } from './transaction.validation';
const routes = express.Router();
routes.post(
  '/',
  auth(
    ENUM_USER_PEMISSION.ADMIN,
    ENUM_USER_PEMISSION.SUPER_ADMIN,
    ENUM_USER_PEMISSION.USER
  ),
  validateRequest(TransactionValidtion.transactionValidator),
  TranasctionController.createNewTransaciton
);
routes.get('/:id', TranasctionController.getSingleTransaction);
routes.get('/uuid/:id', TranasctionController.getTransactionByUuid);

export const TransactionRoute = { routes };
