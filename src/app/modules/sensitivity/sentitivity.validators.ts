import { z } from 'zod';

const sensitivityValidator = z.object({
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
    resultOption: z.array(
      z.object({
        label: z.string({ required_error: 'Label is required' }),
        value: z.string({ required_error: 'Value is required' }),
      }),
      { required_error: 'Result Option are required' }
    ),
  }),
});

const sensitivityValidatorForPatch = z.object({
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
    resultOption: z
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
export const sensitivityValidation = {
  sensitivityValidator,
  sensitivityValidatorForPatch,
};
