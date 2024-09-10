export type IRefund = {
  id: number;
  oid: string;
  grossAmount: number;
  discount: number;
  vat: number;
  netAmount: number;
  refundApplied: number;
  remainingRefund?: number;
  refundedBy: string;
};
