import { IReportGroup } from '../reportGroup/reportGroup.interfaces';
import {
  ITestForDescriptive,
  ITestForParameter,
} from '../reportType/reporttype.interface';
import { ITest } from '../test/test.interfacs';

export type IReport = {
  oid: string;
  analyzerMachine?: string;
  comment?: string;
  seal?: string;
  specimen?: string[];
  conductedBy: string;
  reportGroup: IReportGroup;
};

export type IReportForParameter = {
  testResult?: ITestForParameter[];
} & IReport;

export type IReportForDescriptive = {
  testResult?: ITestForDescriptive[];
} & IReport;

export type Isensitivity = {
  id: string;
  value?: string;
  interpretation?: string;
  mic?: string;
  breakPoint?: string;
};
export type ITestReportForMicrobiology = {
  specimen?: string;
  duration?: string;
  temperature?: string;
  condition?: string;
  growth?: boolean;

  colonyCount?: {
    base: string;
    power: string;
  };
  bacteria?: string;
  sensivityOptions?: Isensitivity[];
};

export type ITestsFromOrder = {
  SL: number;
  test: ITest;
  status: string;
  discount: number;
  ramark?: string;
  delivaryDate?: string;
};

export type IReportForMicrobiology = IReport & ITestReportForMicrobiology;
