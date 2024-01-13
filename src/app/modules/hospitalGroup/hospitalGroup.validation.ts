import { z } from 'zod';

const createHospitalGroupZodSchema = z.object({
  body: z.object({
    label: z.string({
      required_error: 'Hospital group label is required',
    }),
    value: z.string({
      required_error: 'Hospital group value is required',
    }),
    description: z
      .string({
        required_error: 'Hospital group name is required',
      })
      .optional(),
  }),
});

const updateHospitalGroupZodSchema = z.object({
  body: z.object({
    label: z.string({
      required_error: 'Hospital group label is required',
    }),
    value: z.string({
      required_error: 'Hospital group value is required',
    }),
    description: z
      .string({
        required_error: 'Hospital group name is required',
      })
      .optional(),
  }),
});

export const hospitalGrouptValidation = {
  createHospitalGroupZodSchema,
  updateHospitalGroupZodSchema,
};
