import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

//Controller function for getting all the specimen
const FetchSpecimen = catchAsync(
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
const FetchSingleSpecimen = catchAsync(
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
const CreateSpecimen = catchAsync(
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
const EditSpecimen = catchAsync(
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
const RemoveSpecimen = catchAsync(
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

export const SpecimenController = {
  CreateSpecimen,
  EditSpecimen,
  FetchSingleSpecimen,
  FetchSpecimen,
  RemoveSpecimen,

};
