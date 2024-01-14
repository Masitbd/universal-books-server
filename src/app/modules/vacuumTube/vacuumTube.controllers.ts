import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { VacuumTubeServices } from './vacuumTube.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllVacuumTube = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await VacuumTubeServices.getAllVacuumTube();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vacuum Tube fetched successfully',
      data: result,
    });
  }
);
const getSingleVacuumTube = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await VacuumTubeServices.getSingleVacuumTube(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vacuum Tube fetched successfully',
      data: result,
    });
  }
);
const createVacuumTube = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await VacuumTubeServices.createVacuumTube(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create a Vacuum Tube successfully',
      data: result,
    });
  }
);
const updateVacuumTube = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await VacuumTubeServices.updateVacuumTube(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Vacuum Tube Edited successfully',
      data: result,
    });
  }
);
const deleteVacuumTube = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await VacuumTubeServices.deleteVacuumTube(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vacuum Tube deleting successfully',
      data: result,
    });
  }
);

export const VacuumTubeControllers = {
  getAllVacuumTube,
  deleteVacuumTube,
  createVacuumTube,
  getSingleVacuumTube,
  updateVacuumTube,
};
