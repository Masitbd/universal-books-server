import express from 'express';
import { DepartmentRoutes } from '../modules/departments/departments.routes';
import { SensitivityRoutes } from '../modules/sensitivity/sensitivity.routes';
import { ConditionRoutes } from '../modules/condition/condition.routes';

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

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
