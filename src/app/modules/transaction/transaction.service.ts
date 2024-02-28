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

export const TransactionService = {
  postTransaction,
};
