import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TransactionService } from './transaction.service';
const createNewTransaciton = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.postTransaction(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Tranasction successfully created transaction',
    data: result,
    success: true,
  });
});

export const TranasctionController = { createNewTransaciton };
