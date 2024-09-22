import { Router } from 'express';
import { CompanyInfoControllers } from './companyInfo.controller';

const routes = Router();

//  create

routes.post('/', CompanyInfoControllers.createCompanyInfo);

// get
routes.get('/', CompanyInfoControllers.getCompanyInfo);
routes.patch('/:id', CompanyInfoControllers.updateCompanyInfo);

// export

export const CompanyInfoRoutes = { routes };
