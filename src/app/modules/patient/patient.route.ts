import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PatientController } from './patient.controller';
import { PatientValidation } from './patient.validator';
const routes = express.Router();
routes.post(
  '/',
  validateRequest(PatientValidation.PatientValidator),
  PatientController.createNewPatient
);
export const PatientRoute = { routes };
