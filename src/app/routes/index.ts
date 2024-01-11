import express from 'express';
import { ConditionRoutes } from '../modules/condition/condition.routes';
import { DepartmentRoutes } from '../modules/departments/departments.routes';
import { PdrvRoutes } from '../modules/pdrv/pdrv.routes';
import { SensitivityRoutes } from '../modules/sensitivity/sensitivity.routes';
import { SpecimenRoutes } from '../modules/specimen/specimen.routes';
import { VacuumRoutes } from '../modules/vacuumTube/vacuumTube.routes';


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
    path: '/pdrv',
    route: PdrvRoutes.routes,
  },
  {
    path: '/specimen',
    route: SpecimenRoutes.router,
  },
  {
    path: '/test-tube',
    route: VacuumRoutes.router,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
