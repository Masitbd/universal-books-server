import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { pdrvService } from './pdrv.service';

const fetchPdrv = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await pdrvService.findAllPdrv();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pdrv fetched successfully',
      data: result,
    });
  }
);

const fetchSinglePdrv = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await pdrvService.getSinglePdrv(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pdrv Featched successfully',
      data: result,
    });
  }
);

const createPdrv = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await pdrvService.postPdrv(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pdrv was created successfully',
      data: result,
    });
  }
);

const editPdrv = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const payload = req.body;
    const result = await pdrvService.patchPdrv(payload, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pdrv Edited successfully',
      data: result,
    });
  }
);

const removePdrv = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const result = await pdrvService.deletePdrv(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pdrv deleted successfully',
      data: result,
    });
  }
);

export const PdrvController = {
  createPdrv,
  editPdrv,
  removePdrv,
  fetchPdrv,
  fetchSinglePdrv,
};
