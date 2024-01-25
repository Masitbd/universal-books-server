import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { sensitivityService } from './sensitivity.services';

// Controller function for getting all the sensitivity
const getAllSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await sensitivityService.getAllSensitivity();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity fetched successfully',
      data: result,
    });
  }
);

// Contoroller function for getting a specific sensitivity
const getSingleSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await sensitivityService.getSingleSensitivity(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity fetched was successfully',
      data: result,
    });
  }
);

// For creating new sensitivity

const createSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await sensitivityService.createSensitivity(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity was created successfully',
      data: result,
    });
  }
);

// Controller function for editing existing sensitivity
const updateSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const payload = req.body;
    const result = await sensitivityService.updateSensitivity(payload, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity Edited successfully',
      data: result,
    });
  }
);

// Controller function for removing a sensitivity
const deleteSensitivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const result = await sensitivityService.deleteSensitivity(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sensitivity was deleted successfully',
      data: result,
    });
  }
);
export const SensitivityController = {
  createSensitivity,
  updateSensitivity,
  deleteSensitivity,
  getAllSensitivity,
  getSingleSensitivity,
};
