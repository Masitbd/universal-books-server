import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { pdrvService } from './pdrv.service';

const getAllPdrv = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await pdrvService.getAllPdrv();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pdrv all fetched  successfully',
      data: result,
    });
  }
);

const getSinglePdrv = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await pdrvService.getSinglePdrv(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pdrv fetched was successfully',
      data: result,
    });
  }
);

const createPdrv = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await pdrvService.createPdrv(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pdrv was created successfully',
      data: result,
    });
  }
);

const updatePdrv = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const payload = req.body;
    const result = await pdrvService.updatePdrv(payload, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pdrv Edited successfully',
      data: result,
    });
  }
);

const deletePdrv = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const result = await pdrvService.deletePdrv(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pdrv was deleted successfully',
      data: result,
    });
  }
);

export const PdrvController = {
  createPdrv,
  updatePdrv,
  deletePdrv,
  getAllPdrv,
  getSinglePdrv,
};
