import express from 'express';
import { department_routes } from '../modules/departments/departments.routes';

const router = express.Router();

router.use(department_routes);
export default router;
