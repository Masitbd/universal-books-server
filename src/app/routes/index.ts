import express from 'express';
import { ConditionRoutes } from '../modules/condition/condition.routes';
import { DepartmentRoutes } from '../modules/departments/departments.routes';
import { SensitivityRoutes } from '../modules/sensitivity/sensitivity.routes';
import { SpecimenRoutes } from '../modules/specimen/specimen.routes';



const router = express.Router();
const moduleRoutes = [
  {
    path: '/depertments',
    route: DepartmentRoutes,
  },
  {
    path: '/sensitivity',
    route: SensitivityRoutes.routes,
  },
  {
    path: '/condition',
    route: ConditionRoutes.routes,

  },
  {
    path: '/specimen',
    route: SpecimenRoutes.router,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
