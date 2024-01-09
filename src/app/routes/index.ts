import express from 'express';
import { sensivity_routes } from '../modules/sensitivity/sensitivity.routes';
import { DepartmentRoutes } from '../modules/departments/departments.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/depertments',
    route: DepartmentRoutes,
  },
  {
    path: '/sensitivity',
    route: sensivity_routes.router,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
