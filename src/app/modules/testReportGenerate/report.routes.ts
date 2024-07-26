import express from 'express';
import { ReportContorller } from './report.controller';
const routes = express.Router();

routes.post('/', ReportContorller.create);
routes.patch('/', ReportContorller.update);
routes.get('/:oid', ReportContorller.getSingle);
routes.get('/', ReportContorller.getAll);

export const ReportRoutes = { routes };
