import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CommentService } from './comment.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.post(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'comment was created Successfully',
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await CommentService.patch(updatedData, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment was updated successfully',
    data: result,
  });
});

const Remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CommentService.reomve(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment was deleted successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.fetch();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment was featched successfully',
    data: result,
  });
});

const getsingle = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.fetchSingle(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment was featched successfully',
    data: result,
  });
});

export const CommentController = {
  create,
  update,
  Remove,
  getAll,
  getsingle,
};
