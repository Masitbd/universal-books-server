// import { ISpecimen } from './specimen.interfaces';
// import { Specimen } from './specimen.model';

import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { Order } from '../order/order.model';
import {
  IDescriptive,
  IMicrobiologyBacteria,
  IParameterBased,
  ITestReport,
} from './testReport.interfaces';
import { TestReport } from './testReport.model';

type IResultFields = {
  title: string;
  test: string;
  unit: string;
  normalValue: string;
  defaultValue: Types.ObjectId[];
  resultDescripton: string;
  hasPdrv?: boolean;
  sensitivityOptions: Types.ObjectId[];
  conditions: Types.ObjectId[];
  bacteria: Types.ObjectId[];
  duration: string;
  temperatures: string;
  growth: boolean;
  colonyCount?: string;
  _id: string;
};

type finalDataForSendBakcend = {
  testId: string;
  orderId: string;
  result?: string;
  comment?: string;
  resultDescripton?: string;
  type: string;
  data: IResultFields;
};

// // For posting new specimen information
const createTestReport = async (
  payload: finalDataForSendBakcend
): Promise<void | ITestReport> => {
  console.log(payload);
  const parameterBasedObject: Partial<IParameterBased> = {
    _id: payload.data._id,
    title: payload.data.title,
    test: payload.data.test,
    hasPdrv: payload.data.hasPdrv,
    unit: payload.data.unit,
    normalValue: payload.data.normalValue,
    result: payload.result,
    comment: payload.comment,
  };
  const descriptiveObject: Partial<IDescriptive> = {
    _id: payload.data._id,
    title: payload.data.title,
    resultDescripton: payload.resultDescripton,
  };
  const microbiologybacterialObject: Partial<IMicrobiologyBacteria> = {
    _id: payload.data._id,
    bacterias: payload.data.bacteria,
    conditions: payload.data.conditions,
    sensitivityOptions: payload.data.sensitivityOptions,
    colonyCount: payload.data.colonyCount,
    duration: payload.data.duration,
    growth: payload.data.growth,
    temperatures: payload.data.temperatures,
  };

  const data = {
    testId: payload.testId,
    orderId: payload.orderId,
    parameterBased: payload.type === 'parameter' ? [parameterBasedObject] : [],
    descriptive: payload.type === 'descriptive' ? [descriptiveObject] : [],
    microbiology:
      payload.type === 'bacterial' ? [microbiologybacterialObject] : [],
  };
  console.log(microbiologybacterialObject);

  // console.log(data);

  if (payload.type === 'parameter') {
    console.log('p', data);
    const isExist = await TestReport.findOne({ testId: data.testId });
    if (!isExist) {
      console.log(data);
      const newTestReport = new TestReport(data);
      await newTestReport.save();
      console.log('finaldatatosend', newTestReport);
    }

    const isExistForValue = await TestReport.findOne({
      parameterBased: { $elemMatch: { _id: parameterBasedObject._id } },
    });
    if (!isExistForValue) {
      await TestReport.updateOne(
        { testId: data.testId },
        { $push: { parameterBased: parameterBasedObject } }
      );
      console.log('80');
    } else {
      console.log(isExistForValue, '81');
      const updateFields: { [key: string]: string | undefined } = {};

      if (parameterBasedObject.result) {
        updateFields['parameterBased.$.result'] = parameterBasedObject.result;
      } else {
        updateFields['parameterBased.$.comment'] = parameterBasedObject.comment;
      }

      await TestReport.updateOne(
        {
          testId: data.testId,
          'parameterBased._id': parameterBasedObject._id,
        },
        {
          $set: updateFields,
        }
      );
    }
  } else if (payload.type === 'descriptive') {
    console.log(data);
    const isExist = await TestReport.findOne({ testId: data.testId });
    if (!isExist) {
      const newTestReport = new TestReport(data);
      await newTestReport.save();
      console.log('finaldatatosend', newTestReport);
    }

    const isExistForValue = await TestReport.findOne({
      descriptive: { $elemMatch: { _id: descriptiveObject._id } },
    });
    if (!isExistForValue) {
      await TestReport.updateOne(
        { testId: data.testId },
        { $push: { descriptive: descriptiveObject } }
      );
    } else {
      console.log(isExistForValue, '81');
      const updateFields: { [key: string]: string } = {};

      if (descriptiveObject.resultDescripton) {
        updateFields['descriptive.$.resultDescripton'] =
          descriptiveObject.resultDescripton;
        await TestReport.updateOne(
          {
            testId: data.testId,
            'descriptive._id': descriptiveObject._id,
          },
          {
            $set: updateFields,
          }
        );
      }
    }
  } else {
    const microbiologybacterialObject: Partial<IMicrobiologyBacteria> = {
      bacterias: payload.data.bacteria,
      conditions: payload.data.conditions,
      sensitivityOptions: payload.data.sensitivityOptions,
      colonyCount: payload.data.colonyCount,
      duration: payload.data.duration,
      growth: payload.data.growth,
      temperatures: payload.data.temperatures,
    };
    const isExist = await TestReport.findOne({ testId: data.testId });
    if (!isExist) {
      const newTestReport = new TestReport(data);
      await newTestReport.save();
      console.log('finaldatatosend', newTestReport);
    }
    const ifDone = await TestReport.updateOne(
      {
        testId: data.testId,
        'microbiology._id': payload.data._id,
      },
      {
        $set: {
          'microbiology.$': microbiologybacterialObject,
        },
      }
    );
    console.log(ifDone, 'ifDOne');
  }

  //status change
  const order = await Order.findById(data.orderId);
  const index = order?.tests.findIndex(
    test => test.test.toString() === data.testId
  );

  if (order && order.tests[index as number]) {
    order.tests[index as number].status = 'completed';
  }
  await order?.save();
};

// This function works for getting  a single specimen
const getSingleTestReport = async (id: string) => {
  const result = await TestReport.findOne({ testId: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'test report not found');
  }
  return result;
};

// This function works for finding all the specimen
const getAllTestReport = async (): Promise<ITestReport[] | null> => {
  const result = await TestReport.find();
  return result;
};

// This function work for updating single specimen
const updateTestReport = async (
  payload: finalDataForSendBakcend,
  id: string
): Promise<ITestReport | void> => {
  if (payload.type === 'parameter') {
    const isExist = await TestReport.findOne({ testId: payload.testId });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'TestReport not found');
    }
    // const isExistForValue = await TestReport.findOne({
    //   parameterBased: { $elemMatch: { _id: payload.data._id } },
    // });
    // if (!isExistForValue) {
    //   await TestReport.updateOne(
    //     { testId: data.testId },
    //     { $push: { parameterBased: parameterBasedObject } }
    //   );
    // } else {
    //   console.log(isExistForValue, '81');
    const updateFields: { [key: string]: string | undefined } = {};
    if (payload.result) {
      updateFields['parameterBased.$.result'] = payload.result;
    } else {
      updateFields['parameterBased.$.comment'] = payload.comment;
    }
    await TestReport.updateOne(
      {
        testId: payload.testId,
        'parameterBased._id': payload.data._id,
      },
      {
        $set: updateFields,
      }
    );
    // }
  } else if (payload.type === 'descriptive') {
    console.log(data);
    const isExist = await TestReport.findOne({ testId: data.testId });
    if (!isExist) {
      const newTestReport = new TestReport(data);
      await newTestReport.save();
      console.log('finaldatatosend', newTestReport);
    }
    const isExistForValue = await TestReport.findOne({
      descriptive: { $elemMatch: { _id: descriptiveObject._id } },
    });
    if (!isExistForValue) {
      await TestReport.updateOne(
        { testId: data.testId },
        { $push: { descriptive: descriptiveObject } }
      );
    } else {
      console.log(isExistForValue, '81');
      const updateFields: { [key: string]: string } = {};
      if (descriptiveObject.resultDescripton) {
        updateFields['descriptive.$.resultDescripton'] =
          descriptiveObject.resultDescripton;
        await TestReport.updateOne(
          {
            testId: data.testId,
            'descriptive._id': descriptiveObject._id,
          },
          {
            $set: updateFields,
          }
        );
      }
    }
  } else {
    const newTestReport = new TestReport(data);
    await newTestReport.save();
  }
};

// This function work for deleting a single specimen
const deleteTestReport = async (id: string) => {
  // const result = await TestReport.findOneAndDelete({ _id: id });
  const result = await TestReport.deleteMany();
  return result;
};

export const TestReportService = {
  createTestReport,
  getAllTestReport,
  getSingleTestReport,
  updateTestReport,
  deleteTestReport,
};
