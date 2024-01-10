import { z } from 'zod';

const pdrvValidator = z.object({
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
  }),
});

const pdrvValidatorForPatch = z.object({
  body: z.object({
    value: z
      .string({
        required_error: 'Value is required',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Description required',
      })
      .optional(),
    label: z
      .string({
        required_error: 'Label is required',
      })
      .optional(),
  }),
});
export const PdrvValidation = {
  pdrvValidator,
  pdrvValidatorForPatch,
};
