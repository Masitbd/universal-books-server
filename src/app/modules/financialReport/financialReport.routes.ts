import express from 'express';
import { FinancialReportController } from './financialReportController';

const routes = express.Router();
routes.get('/commission/all', FinancialReportController.getOverAllComission);
routes.get(
  '/commission/single/:id',
  FinancialReportController.getDoctorPerformanceSUmmery
);
routes.get(
  '/incomeStatement/testWise',
  FinancialReportController.getTestWiseIncomeStatement
);

export const FinancialReportRoutes = { routes };