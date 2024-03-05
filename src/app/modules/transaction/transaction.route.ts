import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TranasctionController } from './transaction.controller';
import { TransactionValidtion } from './transaction.validation';
const routes = express.Router();
routes.post(
  '/',
  validateRequest(TransactionValidtion.transactionValidator),
  TranasctionController.createNewTransaciton
);
routes.get('/:id', TranasctionController.getSingleTransaction);
routes.get('/uuid/:id', TranasctionController.getTransactionByUuid);

export const TransactionRoute = { routes };
