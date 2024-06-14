import { Types } from 'mongoose';

export type ITestForParameter = {
  test: string;
  investigation: string;
  normalValue: string;
  unit: string;
  hasPdrv: boolean;
  pdrvValues?: Types.ObjectId[];
};

export type ITestForDescriptive = {
  label: string;
  description: string;
};

export type ITestForMicrobiology = {
  sensitivityOpeions: Types.ObjectId[];
  conditions: Types.ObjectId[];
  bacterias: Types.ObjectId[];
};

export type IReportType = {
  group: string;
  resultType: string;
  reportGroup: Types.ObjectId;
  department: Types.ObjectId;
  testInfo:
    | ITestForParameter
    | ITestForDescriptive
    | ITestForMicrobiology
    | null;
};
export type fetchAllreportTypeProps = {
  group: string;
  resultType: string;
  reportGroup: Types.ObjectId;
};

export const reportTypeFlterableField: (keyof fetchAllreportTypeProps)[] = [
  'group',
  'resultType',
  'reportGroup',
];

export type patchReportTypeProps = {
  data: Partial<IReportType>;
  id: string;
};
