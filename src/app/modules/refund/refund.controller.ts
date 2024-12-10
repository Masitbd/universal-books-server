import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RefundService } from './refund.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await RefundService.post(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Refunded successfully',
    data: result,
    success: true,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await RefundService.fetchAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Refund Record Featched successfully',
    data: result,
    success: true,
  });
});

export const RefundController = { create, getAll };
