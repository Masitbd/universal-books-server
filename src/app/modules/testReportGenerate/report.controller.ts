import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReportService } from './report.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.post(req.body);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Test Report Posted successfully.',
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.patch(req.body);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Test report Updated successfully.',
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.fetchSingle(
    req.params.oid,
    req.query as any
  );
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Report Featched successfully.',
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await ReportService.fetchAll();
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reports Featched successfully.',
  });
});

export const ReportContorller = {
  create,
  update,
  getSingle,
  getAll,
};
