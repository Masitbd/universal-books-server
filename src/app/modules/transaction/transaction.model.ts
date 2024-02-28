import { Schema, model } from 'mongoose';
import { ITransaction } from './transaction.interface';

const transactionSchema = new Schema<ITransaction>(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
      enum: ['dr', 'cr'],
    },
    ref: {
      type: Schema.Types.ObjectId,
    },
    uuid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Transation = model<ITransaction>('Transation', transactionSchema);
