import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

//Controller function for getting all the specimen
const fetch_specimen = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = 'hello';
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen fetched successfully',
      data: result,
    });
  }
);

// Controller function for getting a specific specimen
const fetch_single_specimen = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = 'hello';
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen fetched successfully',
      data: result,
    });
  }
);

// For creating new specimen
const create_specimen = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = 'hello';
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen fetched successfully',
      data: result,
    });
  }
);

// Controller function for editing existing specimen
const edit_specimen = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = 'hello';
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen fetched successfully',
      data: result,
    });
  }
);

// Controller function for remove specimen
const remove_specimen = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = 'hello';
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen fetched successfully',
      data: result,
    });
  }
);

export const specimen_controller = {
  create_specimen,
  edit_specimen,
  remove_specimen,
  fetch_single_specimen,
  fetch_specimen,
};
