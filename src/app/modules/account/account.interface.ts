export type IAccount = {
  save(): unknown;
  uuid: string;
  balanceType: string;
  balance: number;
  title?: string;
};
