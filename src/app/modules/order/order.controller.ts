import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrder } from './order.interface';
import { OrderService } from './order.service';

const createNewOrder = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await OrderService.postOrder(req.body);

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  }
);

const getAllOrder = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    // const filterFields = pick(req.params, orderFilterableFields);
    console.log(req.query);

    const result = await OrderService.fetchAll();

    sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order featched successfully',
      data: result,
    });
  }
);

const updateOrder = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await OrderService.orderPatch({
      id: req.params.id,
      data: req.body,
    });

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order featched successfully',
      data: result,
    });
  }
);

export const OrderController = {
  createNewOrder,
  getAllOrder,
  updateOrder,
};
