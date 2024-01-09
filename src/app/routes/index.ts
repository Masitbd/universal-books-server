import express from 'express';
import { department_routes } from '../modules/departments/departments.routes';
import { sensivity_routes } from '../modules/sensitivity/sensitivity.routes';

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
