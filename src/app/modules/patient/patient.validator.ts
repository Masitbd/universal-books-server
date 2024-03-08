import { z } from 'zod';

const PatientValidator = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.string({
      required_error: 'Name is required',
    }),
    gender: z.string({
      required_error: 'Name is required',
    }),
    address: z.string({
      required_error: 'Name is required',
    }),
    ref_by: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    consultant: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    phone: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    image: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
  }),
});

export const PatientValidation = {
  PatientValidator,
};
