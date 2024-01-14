import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BacteriaService } from './bacteria.service';

const fetchBacteria = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await BacteriaService.findAllBacteria();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bacteria fetched successfully',
      data: result,
    });
  }
);

const fetchSingleBacteria = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await BacteriaService.getSingleBacteria(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bacteria Featched successfully',
      data: result,
    });
  }
);

const createBacteria = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await BacteriaService.postBacteria(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bacteria was created successfully',
      data: result,
    });
  }
);

const editBacteria = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const payload = req.body;
    const result = await BacteriaService.patchBacteria(payload, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bacteria Edited successfully',
      data: result,
    });
  }
);

const removeBacteria = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const result = await BacteriaService.deleteBacteria(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bacteria deleted successfully',
      data: result,
    });
  }
);

export const BacteriaController = {
  createBacteria,
  editBacteria,
  removeBacteria,
  fetchBacteria,
  fetchSingleBacteria,
};
