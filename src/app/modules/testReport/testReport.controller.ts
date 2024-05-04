import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TestReportService } from './testReport.services';

// //Controller function for getting all the specimen
const getAllTestReport = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await TestReportService.getAllTestReport();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen all fetched successfully',
      data: result,
    });
  }
);

// Controller function for getting a specific specimen
const getSingleTestReport = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await TestReportService.getSingleTestReport(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen fetched successfully',
      data: result,
    });
  }
);

// For creating new specimen
const createTestReport = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = TestReportService.createTestReport(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen was created successfully',
      data: 'yes',
    });
  }
);

// Controller function for editing existing specimen
const updateTestReport = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = TestReportService.updateTestReport(req.body, req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen was edited successfully',
      data: result,
    });
  }
);

// Controller function for remove specimen
const deleteTestReport = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = TestReportService.deleteTestReport(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specimen was deleted successfully',
      data: result,
    });
  }
);

export const TestReportController = {
  createTestReport,
  updateTestReport,
  getSingleTestReport,
  getAllTestReport,
  deleteTestReport,
};
