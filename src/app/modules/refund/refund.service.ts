import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IDepartment } from '../departments/departments.interfaces';
import { Order } from '../order/order.model';

import { ENUM_TEST_STATUS } from '../../../enums/testStatusEnum';
import { ITestsFromOrder } from '../order/order.interface';
import { Refund } from './refund.model';

const post = async (params: {
  oid: string;
  id: string;
  refundedBy: string;
}) => {
  // Start a Mongoose session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const doesOrderExist = await Order.findOne({ oid: params.oid })
      .populate('tests.test')
      .session(session); // Use session for queries

    if (!doesOrderExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Found');
    }

    const order = doesOrderExist;
    const refundedTest = order.tests.find(
      t => t.SL == Number(params.id)
    ) as ITestsFromOrder;

    if (!refundedTest) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid test Id');
    }

    const refundedTestIndex = order.tests.indexOf(refundedTest);
    let refundedTestPrice = 0;
    if ('price' in refundedTest.test)
      refundedTestPrice = refundedTest?.test?.price;
    const gruntedDiscount = Number(refundedTest.discount);
    const parcentDiscount = order.parcentDiscount;
    const vat = Number(order.vat);
    let refundApplied = 0;
    let remainingRefund = 0;
    let netPriceOfTest = Number(refundedTestPrice);
    let DiscountAmount = 0;

    // Calculate discount
    if (gruntedDiscount > 0) {
      DiscountAmount = Math.ceil((netPriceOfTest * gruntedDiscount) / 100);
      netPriceOfTest -= DiscountAmount;
    }

    if (parcentDiscount > 0 && gruntedDiscount == 0) {
      DiscountAmount = Math.ceil((netPriceOfTest * parcentDiscount) / 100);
      netPriceOfTest -= DiscountAmount;
    }

    if (vat) {
      const VatAmount = (netPriceOfTest * vat) / 100;
      netPriceOfTest += VatAmount;
    }

    // Update order
    order.totalPrice = Math.max(0, order.totalPrice - refundedTestPrice);
    refundedTest.status = ENUM_TEST_STATUS.REFUNDED;
    order.tests.splice(refundedTestIndex, 1, refundedTest);
    if (order.dueAmount > netPriceOfTest) {
      order.dueAmount = order.dueAmount - netPriceOfTest;
      refundApplied = netPriceOfTest;
    }
    if (order.dueAmount <= netPriceOfTest) {
      refundApplied = order.dueAmount;
      remainingRefund = netPriceOfTest - order.dueAmount;
      order.dueAmount = 0;
    }
    await Refund.create(
      [
        {
          discount: DiscountAmount,
          grossAmount: refundedTestPrice,
          id: params.id,
          netAmount: netPriceOfTest,
          oid: params.oid,
          refundedBy: params.refundedBy,
          vat: doesOrderExist?.vat,
          refundApplied: refundApplied,
          remainingRefund: remainingRefund,
        },
      ],
      { session }
    );

    // Save the order using session
    await order.save({ session });

    // Commit the transaction
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    // Rollback the transaction if anything goes wrong
    await session.abortTransaction();
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  } finally {
    // End the session
    session.endSession();
  }
};

const fetchAll = async () => {
  const refunds = await Refund.find({});
  return refunds;
};
// Utility function for calculating doctor commission
const calculateDoctorCommission = (
  department: IDepartment,
  refundedTest: ITestsFromOrder,
  discountedBy: string,
  DiscountAmount: number
) => {
  let doctorCommission = 0;

  const commsissionParcent = department.commissionParcentage;
  const fixedCommission = department.fixedCommission;

  if (commsissionParcent > 0 && 'price' in refundedTest.test) {
    doctorCommission =
      (Number(refundedTest.test.price) * commsissionParcent) / 100;
  }

  if (fixedCommission > 0) {
    doctorCommission = fixedCommission;
  }

  if (doctorCommission > 0 && discountedBy == 'doctor') {
    doctorCommission -= DiscountAmount;
  }

  if (doctorCommission > 0 && discountedBy == 'both') {
    doctorCommission -= Math.ceil(DiscountAmount / 2);
  }

  return doctorCommission;
};

export const RefundService = { post, fetchAll };
