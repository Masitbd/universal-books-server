import { Router } from 'express';
import { incomeStatementControllers } from './incomeStatement.controller';

const router = Router();

// get employee income summer

router.get('/', incomeStatementControllers.getEmployeeIncomeStatement);
router.get(
  '/summery',
  incomeStatementControllers.getEmployeeIncomeStatementSummery
);

export const incomeStatementRoutes = { router };
