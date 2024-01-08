import { z } from 'zod';

const createDepartmentZodSchema = z.object({
  body: z.object({
    departmentName: z.string({
      required_error: 'department name is required',
    }),
    doctorCommision: z.number({
      required_error: 'doctor commision is required',
      invalid_type_error: 'doctor commision must be a number',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
  }),
});

const updateDepartmentZodSchema = z.object({
  body: z.object({
    departmentName: z.string({
      required_error: 'department name is required',
    }),
    doctorCommision: z.number({
      required_error: 'doctor commision is required',
      invalid_type_error: 'doctor commision must be a number',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
  }),
});

export const departmentValidation = {
  createDepartmentZodSchema,
  updateDepartmentZodSchema,
};
