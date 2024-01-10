import { Model } from 'mongoose';

export type IDepartment = {
  departmentName: string;
  doctorCommisionPer: number;
  doctorCommisionFixed: number;
  isActive: boolean;
  description?: string;
};

export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;
