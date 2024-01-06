import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IDepartment } from './departments.interfaces';
import { department_services } from './departments.services';

export const department_controller = {
  create_department: catchAsync(async (req: Request, res: Response) => {
    const result = await department_services.create_department(req.body);
    sendResponse<IDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department Created Successfully',
      data: result,
    });
  }),
};
