import { model, Schema } from 'mongoose';
import { IRefund } from './refund.inrerface';

const refundSchema = new Schema<IRefund>(
  {
    discount: Number,
    grossAmount: Number,
    id: { type: Number, required: true },
    netAmount: Number,
    refundApplied: { type: Number, required: true },
    remainingRefund: Number,
    oid: { type: String, required: true },
    vat: Number,
    refundedBy: String,
  },
  {
    timestamps: true,
  }
);

export const Refund = model('Refund', refundSchema);
