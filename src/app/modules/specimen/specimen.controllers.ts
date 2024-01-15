import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { SpecimenService } from './specimen.services';

//Controller function for getting all the specimen
const getAllSpecimen = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await SpecimenService.getAllSpecimen() ;
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen all fetched successfully',
      data: result,
    });
  }
);

// Controller function for getting a specific specimen
const getSingleSpecimen = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await SpecimenService.getSingleSpecimen(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen fetched successfully',
      data: result,
    });
  }
);

// For creating new specimen
const createSpecimen = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = SpecimenService.createSpecimen(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen was created successfully',
      data: result,
    });
  }
);

// Controller function for editing existing specimen
const updateSpecimen = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = SpecimenService.updateSpecimen(req.body, req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen was edited successfully',
      data: result,
    });
  }
);

// Controller function for remove specimen
const deleteSpecimen = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = SpecimenService.deleteSpecimen(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen was deleted successfully',
      data: result,
    });
  }
);

export const SpecimenController = {
  createSpecimen,
  updateSpecimen,
  getSingleSpecimen,
  getAllSpecimen,
  deleteSpecimen,
};
