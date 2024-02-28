import { Types } from 'mongoose';

export type ITransaction = {
  amount: number;
  ref?: Types.ObjectId | null;
  description: string;
  transactionType: string;
  uuid: string;
};
