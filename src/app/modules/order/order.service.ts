import { IOrder } from './order.interface';
import { Order } from './order.model';

const postOrder = async (params: IOrder) => {
  const result = await Order.create(params);
  return result;
};
export const OrderService = { postOrder };
