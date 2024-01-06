import { z } from 'zod';

const create_department = z.object({
  body: z.object({
    department_name: z.string({
      required_error: 'department name is required',
    }),
    doctor_commision: z.number({
      required_error: 'doctor commision is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
  }),
});

export const department_validation = {
  create_department,
};  
