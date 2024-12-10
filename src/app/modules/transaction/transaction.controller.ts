import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TransactionService } from './transaction.service';
const createNewTransaciton = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user?.uuid;
  const result = await TransactionService.postTransaction({
    ...req.body,
    postedBy: user,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'successfully created transaction',
    data: result,
    success: true,
  });
});

const getSingleTransaction = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.fetchSingleTransaction(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Featched transaction successfully',
    data: result,
    success: true,
  });
});

const getTransactionByUuid = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.fetchSIngleByUuid(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Featched transaction successfully',
    data: result,
    success: true,
  });
});
export const TranasctionController = {
  createNewTransaciton,
  getSingleTransaction,
  getTransactionByUuid,
};
