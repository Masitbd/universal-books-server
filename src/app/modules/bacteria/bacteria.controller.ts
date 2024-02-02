import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BacteriaService } from './bacteria.service';

const getAllBacteria = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await BacteriaService.getAllBacteria();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bacteria all fetched was successfully',
      data: result,
    });
  }
);

const getSingleBacteria = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await BacteriaService.getSingleBacteria(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single fetched was Bacteria successfully',
      data: result,
    });
  }
);

const createBacteria = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await BacteriaService.createBacteria(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bacteria was created successfully',
      data: result,
    });
  }
);

const updateBacteria = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const payload = req.body;
    const result = await BacteriaService.updateBacteria(payload, id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bacteria was edited successfully',
      data: result,
    });
  }
);

const deleteBacteria = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const result = await BacteriaService.deleteBacteria(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bacteria was deleted successfully',
      data: result,
    });
  }
);

export const BacteriaController = {
  createBacteria,
  updateBacteria,
  deleteBacteria,
  getAllBacteria,
  getSingleBacteria,
};
