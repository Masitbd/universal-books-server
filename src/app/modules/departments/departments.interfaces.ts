import { Model } from 'mongoose';

export type IDepartment = {
  departmentName: string;
  doctorCommision: number;
  description: string;
};

export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;
