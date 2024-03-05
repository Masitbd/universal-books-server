import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { ITransaction } from '../transaction/transaction.interface';
import { IAccount } from './account.interface';
import { Account } from './account.model';
const postAccount = async (data: IAccount) => {
  const result = await Account.create(data);
  return result;
};

const patchAccount = async (data: ITransaction) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const transBalanceType = data.transactionType;
    const account: IAccount | null = await Account.findOne({ uuid: data.uuid });
    if (!account) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Account not found');
    }
    const userBalanceType = account?.balanceType;
    if (transBalanceType && account) {
      if (userBalanceType === transBalanceType) {
        const amount = Number(account?.balance) + Number(data.amount);
        account.balance = amount;
        account.save();
      } else {
        if (account.balance < data.amount) {
          throw new ApiError(
            httpStatus.NOT_ACCEPTABLE,
            'There is not enough balance in this account for transaciton'
          );
        }
        const amount = Number(account?.balance) - Number(data.amount);
        account.balance = amount;
        account.save();
        await session.commitTransaction();
        session.endSession();
        return account;
      }
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error. Try again later.'
    );
  }
};

const fetchSingle = async (params: string) => {
  const result = await Account.findOne({ user: params });
  return result;
};
export const AccountService = { postAccount, patchAccount, fetchSingle };
