import express from 'express';

import { DepartmentRoutes } from '../modules/departments/departments.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/depertments',
    route: DepartmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
