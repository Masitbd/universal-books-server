import express from 'express';
import { department_routes } from '../modules/departments/departments.routes';
import { sensivity_routes } from '../modules/sensitivity/sensitivity.routes';

const router = express.Router();

router.use(department_routes);
router.use('/sensitivity', sensivity_routes.router);
export default router;
