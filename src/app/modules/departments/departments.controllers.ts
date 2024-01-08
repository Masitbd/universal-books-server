import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IDepartment } from './departments.interfaces';
import { DepartmentService } from './departments.services';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentService.createDepartment(req.body);
  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department Created Successfully',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DepartmentService.getSingleDepartment(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'One Department Find Successfully',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentService.getAllDepartment();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delpartments Found Successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await DepartmentService.updateDepartment(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'One record update successfully',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DepartmentService.deleteDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'One Department delete successfully',
    data: result,
  });
});

export const DepartmentController = {
  createDepartment,
  getSingleDepartment,
  getAllDepartment,
  updateDepartment,
  deleteDepartment,
};
