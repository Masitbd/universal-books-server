import { ITransaction } from '../transaction/transaction.interface';
import { IAccount } from './account.interface';
import { Account } from './account.model';

const postNewAccount = async (data: IAccount) => {
  const result = await Account.create(data);
  return result;
};

const patchAccount = async (data: ITransaction) => {
  const transBalanceType = data.transactionType;
  const account: IAccount | null = await Account.findOne({ uuid: data.uuid });
  const userBalanceType = account?.balanceType;
  if (transBalanceType && account) {
    if (userBalanceType === transBalanceType) {
      const amount = Number(account?.balance) + Number(data.amount);
      account.balance = amount;
      account.save();
    } else {
      const amount = Number(account?.balance) - Number(data.amount);
      account.balance = amount;
      account.save();
    }
  }
  return account;
};

const fetchSingle = async (params: string) => {
  const result = await Account.findOne({ user: params });
  return result;
};
export const AccountService = { postNewAccount, patchAccount, fetchSingle };
