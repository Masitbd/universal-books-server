import express from 'express';
import { condition_routes } from '../modules/condition/condition.routes';
import { department_routes } from '../modules/departments/departments.routes';
import { sensivity_routes } from '../modules/sensitivity/sensitivity.routes';

const router = express.Router();

router.use(department_routes);
router.use(sensivity_routes.router);
router.use(condition_routes.routes);
export default router;
