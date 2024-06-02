import express from 'express';
import { ReportGroupController } from './reportGroup.controller';

const routes = express.Router();

routes.get('/', ReportGroupController.getAllReportGroup);

routes.post('/', ReportGroupController.createReportGroup);

routes.get('/:id', ReportGroupController.getSingleReportGroup);

routes.patch('/:id', ReportGroupController.updateReportGroup);

routes.delete('/:id', ReportGroupController.deleteReportGroup);

export const ReportGroupRoutes = { routes };
