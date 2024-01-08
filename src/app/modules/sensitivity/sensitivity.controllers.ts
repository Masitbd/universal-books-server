import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { sensitivity_service } from './sensitivity.services';

// Controller function for getting all the sensitivity
const fetch_sensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await sensitivity_service.find_all_sensitivity();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity fetched successfully',
      data: result,
    });
  }
);

// Contoroller function for getting a specific sensitivity
const fetch_single_sensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await sensitivity_service.get_single_sensitivity(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity Featched successfully',
      data: result,
    });
  }
);

// For creating new sensitivity

const create_sensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await sensitivity_service.post_sensitivity(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity was created successfully',
      data: result,
    });
  }
);

// Controller function for editing existing sensitivity
const edit_sensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const payload = req.body;
    const result = await sensitivity_service.patch_sensitivity(payload, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity Edited successfully',
      data: result,
    });
  }
);

// Controller function for removing a sensitivity
const remove_sensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const result = await sensitivity_service.delete_sensitivity(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity deleted successfully',
      data: result,
    });
  }
);
export const sensitivity_controller = {
  create_sensitivity,
  edit_sensitivity,
  remove_sensitivity,
  fetch_sensitivity,
  fetch_single_sensitivity,
};
