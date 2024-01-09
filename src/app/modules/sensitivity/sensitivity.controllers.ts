import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SensitivityService } from './sensitivity.services';

// Controller function for getting all the sensitivity
const FetchSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await SensitivityService.FindAllSensitivity();
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
    const result = await SensitivityService.GetSingleSensitivity(id);
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
    const result = await SensitivityService.PostSensitivity(req.body);
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
    const result = await SensitivityService.PatchSensitivity(payload, id);
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

    const result = await SensitivityService.DeleteSensitivity(id);
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
