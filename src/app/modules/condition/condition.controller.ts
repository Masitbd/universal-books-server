import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ConditionService } from './condition.service';

const createCondition = catchAsync(async (req: Request, res: Response) => {
  const result = await ConditionService.createCondition(req.body);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Condition was created successfully',
  });
});

const getAllCondition = catchAsync(async (req: Request, res: Response) => {
  const result = await ConditionService.getAllCondition();
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Condition all fetched was successfully',
  });
});

const getSingleCondition = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ConditionService.getSingleCondition(id);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single fetched was condition successfully',
  });
});

const updateCondition = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ConditionService.updateCondition(req.body, id);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Condition was updated successfully',
  });
});

const deleteCondition = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ConditionService.deleteCondition(id);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Condition was deleted successfully',
  });
});
export const ConditionController = {
  createCondition,
  getAllCondition,
  getSingleCondition,
  updateCondition,
  deleteCondition,
};
