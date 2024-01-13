import { Model } from 'mongoose';

export type IHospitalGroup = {
  label: string;
  value: string;
  description?: string;
};

export type DepartmentModel = Model<IHospitalGroup, Record<string, unknown>>;
