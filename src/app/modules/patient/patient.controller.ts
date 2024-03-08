import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IPatient } from './patient.interface';
import { PatientService } from './patient.service';

const createNewPatient = catchAsync(async (req: Request, res: Response) => {
  const testData = req.body;

  const result = await PatientService.postPatient(
    testData as unknown as IPatient
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Test successfully created',
    data: result,
    success: true,
  });
});

export const PatientController = { createNewPatient };
