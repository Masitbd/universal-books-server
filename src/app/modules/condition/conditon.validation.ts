import { z } from 'zod';
const conditionValidator = z.object({
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

const conditionValidatorForPatch = z.object({
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

export const ConditionValidation = {
  conditionValidator,
  conditionValidatorForPatch,
};
