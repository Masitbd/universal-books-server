import { Model } from 'mongoose';

export type IHospitalGroup = {
  hospitalGroupName: string;
  description?: string;
};

export type DepartmentModel = Model<IHospitalGroup, Record<string, unknown>>;
