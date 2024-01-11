import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IHospitalGroup } from './hospitalGroup.interface';
import { HospitalService } from './hospitalGroup.service';

const createHospitalGroup = catchAsync(async (req: Request, res: Response) => {
  const result = await HospitalService.createHospitalGroup(req.body);
  sendResponse<IHospitalGroup>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital Group Created Successfully',
    data: result,
  });
});

const getSingleHospitalGroup = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await HospitalService.getSingleHospitalGroup(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'One Hospital Group Find Successfully',
      data: result,
    });
  }
);

const getAllHospitalGroup = catchAsync(async (req: Request, res: Response) => {
  const result = await HospitalService.getAllHospitalGroup();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hospital Group Found Successfully',
    data: result,
  });
});

const updateHospitalGroup = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await HospitalService.updateHospitalGroup(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'One record update successfully',
    data: result,
  });
});

const deleteHospitalGroup = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await HospitalService.deleteHospitalGroup(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'One Department delete successfully',
    data: result,
  });
});

export const HospitalGroupController = {
  createHospitalGroup,
  getSingleHospitalGroup,
  getAllHospitalGroup,
  updateHospitalGroup,
  deleteHospitalGroup,
};
