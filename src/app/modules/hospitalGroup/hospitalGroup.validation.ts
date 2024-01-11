import { z } from 'zod';

const createHospitalGroupZodSchema = z.object({
  body: z.object({
    hospitalGroupName: z.string({
      required_error: 'Hospital group name is required',
    }),
  }),
});

const updateHospitalGroupZodSchema = z.object({
  body: z.object({
    hospitalGroupName: z.string({
      required_error: 'Hospital group name is required',
    }),
  }),
});

export const hospitalGrouptValidation = {
  createHospitalGroupZodSchema,
  updateHospitalGroupZodSchema,
};
