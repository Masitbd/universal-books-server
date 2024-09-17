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
routes.get(
  '/incomeStatement/clientWise',
  FinancialReportController.clientWiseIncomeStatement
);

routes.get(
  '/incomeStatement/refByWise',
  FinancialReportController.refByWiseIncomeStatement
);
routes.get(
  '/incomeStatement/deptWise',
  FinancialReportController.getDeptWiseIncomeStatement
);

routes.get(
  '/collectionStatement/deptWise',
  FinancialReportController.getDeptWIseCollectionSummery
);

routes.get(
  '/doctorsPerformance/deptWise/:id',
  FinancialReportController.getDeptWiseDoctorPerformance
);
routes.get(
  '/doctorsPerformance/testWise/:id',
  FinancialReportController.getTestWiseDoctorPerformance
);
export const FinancialReportRoutes = { routes };
