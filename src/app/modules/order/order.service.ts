import { IOrder } from './order.interface';
import { Order, OrderForRegistered, OrderForUnregistered } from './order.model';

const postOrder = async (params: IOrder) => {
  if (params.patientType === 'registered') {
    const result = await OrderForRegistered.create(params);
    return result;
  } else {
    const result = await OrderForUnregistered.create(params);
    return result;
  }
};
const fetchAll = async () => {
  const result = await Order.find().populate('refBy').populate('tests.test');

  return result;
};
const orderPatch = async (param: { id: string; data: Partial<IOrder> }) => {
  const result = await Order.findOneAndUpdate({ _id: param.id }, param.data, {
    new: true,
  });
  return result;
};
export const OrderService = { postOrder, fetchAll, orderPatch };
