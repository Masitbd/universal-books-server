import { z } from 'zod';
const transactionValidator = z.object({
  body: z.object({
    amount: z.number({ required_error: 'Amount is required' }),
    ref: z
      .string({
        required_error: 'Ref must be saring',
      })
      .optional(),

    description: z.string({
      required_error: 'Description is required',
    }),
    uuid: z.string({
      required_error: 'UUID is required',
    }),
  }),
});

export const TransactionValidtion = { transactionValidator };
