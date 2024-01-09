import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { sensitivityService } from './sensitivity.services';

// Controller function for getting all the sensitivity
const FetchSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await sensitivityService.findAllSensitivity();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity fetched successfully',
      data: result,
    });
  }
);

// Contoroller function for getting a specific sensitivity
const FetchSingleSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await sensitivityService.getSingleSensitivity(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity Featched successfully',
      data: result,
    });
  }
);

// For creating new sensitivity

const CreateSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await sensitivityService.postSensitivity(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity was created successfully',
      data: result,
    });
  }
);

// Controller function for editing existing sensitivity
const EditSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const payload = req.body;
    const result = await sensitivityService.patchSensitivity(payload, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity Edited successfully',
      data: result,
    });
  }
);

// Controller function for removing a sensitivity
const RemoveSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const result = await sensitivityService.deleteSensitivity(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity deleted successfully',
      data: result,
    });
  }
);
export const SensitivityController = {
  CreateSensitivity,
  EditSensitivity,
  RemoveSensitivity,
  FetchSensitivity,
  FetchSingleSensitivity,
};
