import { Model } from 'mongoose';

export type IReportGroup = {
  value: string;
  description: string;
  label: string;
};

export type ReportGroupModel = Model<IReportGroup, Record<string, unknown>>;
