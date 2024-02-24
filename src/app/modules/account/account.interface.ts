import { Types } from 'mongoose';

export type IAccount = {
  user: Types.ObjectId;
  balanceType: string;
  balance: number;
};
