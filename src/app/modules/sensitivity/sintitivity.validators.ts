import { z } from 'zod';

const sensitivity_validator = z.object({
  body: z.object({
    value: z.string({
      required_error: 'Value is required',
    }),
    description: z.string({
      required_error: 'Description required',
    }),
    label: z.string({
      required_error: 'Label is required',
    }),
    result_option: z.array(
      z.object({
        label: z.string({ required_error: 'Label is required' }),
        value: z.string({ required_error: 'Value is required' }),
      }),
      { required_error: 'Result Option are required' }
    ),
  }),
});

export const seinsitivity_validation = {
  sensitivity_validator,
};
