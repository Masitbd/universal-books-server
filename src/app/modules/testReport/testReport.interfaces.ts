import { Model, Types } from 'mongoose';

export type ITestReport = {
  orderId: Types.ObjectId;
  testId: Types.ObjectId;
  defaultValue: Types.ObjectId[];
  microbiology?: IMicrobiologyBacteria[];
  descriptive?: IDescriptive[];
  parameterBased?: IParameterBased[];
};

export type IMicrobiologyBacteria = {
  _id: string;
  duration: string;
  temperatures: string;
  conditions: Types.ObjectId[];
  growth: boolean;
  colonyCount?: string;
  bacterias?: Types.ObjectId[];
  sensitivityOptions?: Types.ObjectId[];
};

export type IDescriptive = {
  _id: string;
  title: string;
  resultDescripton: string;
};
export type IParameterBased = {
  _id: string;
  title: string;
  test: string;
  hasPdrv: boolean;
  unit: string;
  normalValue: string;
  result: string;
  comment: string;
};

export type TestReportModel = Model<ITestReport, Record<string, unknown>>;
