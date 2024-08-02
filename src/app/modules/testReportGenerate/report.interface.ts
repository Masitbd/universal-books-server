import { IReportGroup } from '../reportGroup/reportGroup.interfaces';
import { ITestForParameter } from '../reportType/reporttype.interface';
import { ITest } from '../test/test.interfacs';

export type IReport = {
  oid: string;
  analyzerMachine?: string;
  comment?: string;
  doctorsSeal?: string;
  specimen?: string[];
  conductedBy: string;
  reportGroup: IReportGroup;
};

export type IReportForParameter = {
  testResult?: ITestForParameter[];
} & IReport;

export type ITestsFromOrder = {
  SL: number;
  test: ITest;
  status: string;
  discount: number;
  ramark: string;
};
