import { Types } from 'mongoose';

export type IReportTypeGroup = {
  group: string;
  resultType: string;
  reportGroup: Types.ObjectId;
};

export type reportTypeServiceProps = {
  data: IReportTypeGroup;
  id: string;
};

export type IFilterableOptionsG = {
  [key: string]: Types.ObjectId;
};
export type IFilterableOptions = {
  reportGroup: Types.ObjectId;
} & IFilterableOptionsG;
