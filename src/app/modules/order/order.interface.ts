import { Types } from 'mongoose';

export type IOrder = {
  uuid: string;
  tests: [{ test: Types.ObjectId[]; status: string; discount: number }];
  totalPrice: number;
  cashDiscount: number;
  parcentDiscount: number;
  deliveryTime: string;
  status: string;
  dueAmount: number;
  refBy?: Types.ObjectId;
};
