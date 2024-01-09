import { z } from 'zod';

const SensitivityValidator = z.object({
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

const SensitivityValidatorForPatch = z.object({
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
    result_option: z
      .array(
        z
          .object({
            label: z.string({ required_error: 'Label is required' }),
            value: z.string({ required_error: 'Value is required' }).optional(),
          })
          .optional(),
        { required_error: 'Result Option are required' }
      )
      .optional(),
  }),
});
export const SeinsitivityValidation = {
  SensitivityValidator,
  SensitivityValidatorForPatch,
};
