import { z } from 'zod';

const createDepartmentZodSchema = z.object({
  body: z.object({
    departmentName: z.string({
      required_error: 'department name is required',
    }),
    doctorCommisionPer: z.number({
      required_error: 'doctor commision percentage is required',
      invalid_type_error: 'doctor commision percentage must be a number',
    }),
    doctorCommisionFixed: z.number({
      required_error: 'doctor commision fixed is required',
      invalid_type_error: 'doctor commision fixed must be a number',
    }),
  }),
});

const updateDepartmentZodSchema = z.object({
  body: z.object({
    departmentName: z.string({
      required_error: 'Department name is required',
    }),
    doctorCommisionPer: z.number({
      required_error: 'Doctor commision percentage is required',
      invalid_type_error: 'Doctor commision percentage must be a number',
    }),
    doctorCommisionFixed: z.number({
      required_error: 'Doctor commision fixed is required',
      invalid_type_error: 'Doctor commision fixed must be a number',
    }),
  }),
});

export const departmentValidation = {
  createDepartmentZodSchema,
  updateDepartmentZodSchema,
};
