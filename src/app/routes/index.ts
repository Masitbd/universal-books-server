import express from 'express';

import { DepartmentRoutes } from '../modules/departments/departments.routes';
import { SensitivityRoutes } from '../modules/sensitivity/sensitivity.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/depertments',
    route: DepartmentRoutes,
  },
  {
    path: '/sensitivity',
    route: SensitivityRoutes.router,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
