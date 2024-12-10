import { z } from 'zod';

const VacuumTubeValidator = z.object({
  body: z.object({
    value: z.string({
      required_error: 'Value is required',
    }),
    label: z.string({
      required_error: 'Label is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    description: z
      .string({
        required_error: 'Price is required',
      })
      .optional(),
  }),
});
const VacuumTubeValidatorForUpdate = z.object({
  body: z.object({
    value: z
      .string({
        required_error: 'Value is required',
      })
      .optional(),
    label: z
      .string({
        required_error: 'Label is required',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Price is required',
      })
      .optional(),
  }),
});

export const VacuumTubeValidation = {
  VacuumTubeValidator,
  VacuumTubeValidatorForUpdate,
};
