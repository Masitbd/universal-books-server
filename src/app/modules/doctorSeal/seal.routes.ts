import express from 'express';
import { DoctorSealController } from './seal.controller';

const routes = express.Router();
routes.post('/', DoctorSealController.createDoctorSeal);
routes.patch('/:id', DoctorSealController.updateDoctorSeal);
routes.delete('/:id', DoctorSealController.deleteDoctorSeal);
routes.get('/', DoctorSealController.getAllDoctorSeal);
routes.get('/:id', DoctorSealController.getSingleDoctorSeal);

export const DoctorSealRoutes = { routes };