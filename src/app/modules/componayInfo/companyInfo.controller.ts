import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CompanyInfoServices } from './companyInfo.services';

const createCompanyInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await CompanyInfoServices.createCompanyInfoIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'company info created Successfully',
    data: result,
  });
});

// get

const getCompanyInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await CompanyInfoServices.getCompanyInfoFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'company info retrived Successfully',
    data: result,
  });
});

// update

const updateCompanyInfo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CompanyInfoServices.updateCompanyInfoIntoDB(
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'company info updated Successfully',
    data: result,
  });
});

// exports

export const CompanyInfoControllers = {
  createCompanyInfo,
  getCompanyInfo,
  updateCompanyInfo,
};
