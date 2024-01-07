import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { sensitivity_service } from './sinsivity.services';

// For creating new sensitivity

const create_sensitivity = catchAsync(async (req: Request, res: Response) => {
  const result = await sensitivity_service.post_sensitivity(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sensitivity was created successfully',
    data: result,
  });
});

export const sensitivity_controller = {
  create_sensitivity,
};
