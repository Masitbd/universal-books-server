import mongoose from 'mongoose';
import { AccountService } from '../account/account.service';
import { ITransaction } from './transaction.interface';
import { Transation } from './transaction.model';

const postTransaction = async (data: ITransaction) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const accountResult = await AccountService.patchAccount(data);
    const result = await Transation.create(data);
    console.log(accountResult, 'accountResult');
    await session.commitTransaction();
    await session.endSession();
    return {
      result,
      accountResult,
    };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const fetchSingleTransaction = async (data: string) => {
  const result = await Transation.findOne({ _id: data });
  return result;
};

const fetchSIngleByUuid = async (data: string) => {
  console.log(data, 'uuid');
  const result = await Transation.find({ uuid: data });
  return result;
};
export const TransactionService = {
  postTransaction,
  fetchSingleTransaction,
  fetchSIngleByUuid,
};
