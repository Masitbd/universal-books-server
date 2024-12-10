import { z } from 'zod';

const sensitivityValidator = z.object({
  body: z.object({
    value: z.string({
      required_error: 'Value is required',
    }),
    breakPoint: z.string({
      required_error: 'Value is required',
    }),
    mic: z.string({
      required_error: 'Value is required',
    }),
  }),
});

const sensitivityValidatorForPatch = z.object({
  body: z.object({
    value: z
      .string({
        required_error: 'Value is required',
      })
      .optional(),
    breakPoint: z
      .string({
        required_error: 'Value is required',
      })
      .optional(),
    mic: z
      .string({
        required_error: 'Value is required',
      })
      .optional(),
  }),
});
export const sensitivityValidation = {
  sensitivityValidator,
  sensitivityValidatorForPatch,
};
