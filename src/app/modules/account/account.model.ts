import { Schema, model } from 'mongoose';
import { IAccount } from './account.interface';
const AccountSchema = new Schema<IAccount>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    balance: {
      type: Number,
      required: true,
    },
    balanceType: {
      type: String,
      enum: ['dr', 'cr'],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Account = model<IAccount>('Account', AccountSchema);
