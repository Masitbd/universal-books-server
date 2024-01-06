import { Document } from 'mongoose';
export type IDepartment = {
  department_name: string;
  doctor_commision: number;
  description: string;
} & Document;
