import { AccountService } from '../account/account.service';
import { ITransaction } from './transaction.interface';
import { Transation } from './transaction.model';

const postTransaction = async (data: ITransaction) => {
  const result = await Transation.create(data);
  const accountResult = await AccountService.patchAccount(data);
  return {
    result,
    accountResult,
  };
};

const fetchSingleTransaction = async (data: string) => {
  const result = await Transation.findOne({ _id: data });
  return result;
};

const fetchSIngleByUuid = async (data: string) => {
  const result = await Transation.findOne({ uuid: data });
  return result;
};
export const TransactionService = {
  postTransaction,
  fetchSingleTransaction,
  fetchSIngleByUuid,
};
