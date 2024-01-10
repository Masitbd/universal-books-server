import express from 'express';
import { ConditionRoutes } from '../modules/condition/condition.routes';
import { DepartmentRoutes } from '../modules/departments/departments.routes';
import { PdrvRoutes } from '../modules/pdrv/pdrv.routes';
import { SensitivityRoutes } from '../modules/sensitivity/sensitivity.routes';

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
  {
    path: '/pdrv',
    route: PdrvRoutes.routes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
