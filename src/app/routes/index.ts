import express from 'express';
import { DepartmentRoutes } from '../modules/departments/departments.routes';
import { SensitivityRoutes } from '../modules/sensitivity/sensitivity.routes';
import { ConditionRoutes } from '../modules/condition/condition.routes';

<<<<<<< HEAD
=======
const router = express.Router();
const moduleRoutes = [
  {
    path: '/sensitivity',
    route: SensitivityRoutes.router,
  },
  {
    path: '/depertments',
    route: DepartmentRoutes,
  },
  {
    path: '/condition',
    route: ConditionRoutes.routes,
  },
];
>>>>>>> 15536d3cb41fa2d543a8bbe74e4d5c4c604f2e3e

export default router;
