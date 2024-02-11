import { z } from 'zod';

const DoctorValidator = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    fatherName: z.string({
      required_error: 'Father Name is required',
    }),
    designation: z.string({
      required_error: 'Designation is required',
    }),
    phone: z.number({
      required_error: 'Phone Number is required',
    }),
    image: z.string().optional(),
    defaultImage: z.string().optional(),
  }),
});
const DoctorValidatorForUpdate = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    fatherName: z
      .string({
        required_error: 'Father Name is required',
      })
      .optional(),
    designation: z
      .string({
        required_error: 'Designation is required',
      })
      .optional(),
    phone: z
      .number({
        required_error: 'Phone Number is required',
      })
      .optional(),
    image: z.string().optional(),
    defaultImage: z.string().optional(),
  }),
});

export const DoctorValidation = {
  DoctorValidator,
  DoctorValidatorForUpdate,
};
