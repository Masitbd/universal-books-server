import express from 'express';
import { TranasctionController } from './transaction.controller';
const routes = express.Router();
routes.post('/', TranasctionController.createNewTransaciton);

export const TransactionRoute = { routes };
