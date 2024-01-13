import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentController } from './departments.controllers';
import { departmentValidation } from './departments.validations';
const router = express.Router();

router.post(
  '/',
  validateRequest(departmentValidation.createDepartmentZodSchema),
  DepartmentController.createDepartment
);
router.get('/:id', DepartmentController.getSingleDepartment);
router.get('/', DepartmentController.getAllDepartment);
router.patch('/:id', DepartmentController.updateDepartment);
router.delete('/:id', DepartmentController.deleteDepartment);

export const DepartmentRoutes = router;
