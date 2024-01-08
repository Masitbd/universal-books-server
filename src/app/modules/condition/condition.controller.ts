import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { condition_service } from './condition.service';

// Controller function for creating new condition
const create_condition = catchAsync(async (req: Request, res: Response) => {
  const result = await condition_service.post_condition(req.body);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Condition created successfully',
  });
});

// Controller function for fetching all the condition
const fetch_condition = catchAsync(async (req: Request, res: Response) => {
  const result = await condition_service.get_condition();
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Condition featched successfully',
  });
});

// Controller for fetching single condition
const fetch_single_condition = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await condition_service.get_single_condition(id);
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Condition featched successfully',
    });
  }
);

// COntroller function for updating a condition
const update_condition = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await condition_service.patch_condition(req.body, id);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Condition updated successfully',
  });
});

// Controller function for removing a condition
const remove_condition = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await condition_service.delete_condition(id);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Condition deleted successfully',
  });
});
export const condition_controller = {
  create_condition,
  fetch_condition,
  fetch_single_condition,
  update_condition,
  remove_condition,
};
