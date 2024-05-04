import { Schema, model } from 'mongoose';
import { ITestReport, TestReportModel } from './testReport.interfaces';

const TestReportSchema = new Schema<ITestReport, TestReportModel>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'orders',
    },
    testId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Tests',
    },
    defaultValue: [
      {
        type: Schema.Types.ObjectId,
        ref: 'pdrvs',
      },
    ],

    descriptive: [
      {
        title: {
          type: String,
          required: true,
        },
        resultDescripton: {
          type: String,
        },
      },
    ],
    parameterBased: [
      {
        title: {
          type: String,
          required: true,
        },
        test: {
          type: String,
          required: true,
        },
        unit: {
          type: String,
        },
        normalValue: {
          type: String,
        },
        result: {
          type: String,
        },
        comment: {
          type: String,
        },
        hasPdrv: {
          type: Boolean,
        },
      },
    ],
    microbiology: [
      {
        duration: {
          type: String,
        },
        temperatures: {
          type: String,
        },
        conditions: [
          {
            type: Schema.Types.ObjectId,
            ref: 'conditions',
          },
        ],
        growth: {
          type: Boolean,
        },
        colonyCount: {
          type: String,
        },
        bacterias: [
          {
            type: Schema.Types.ObjectId,
            ref: 'bacterias',
          },
        ],
        sensitivityOptions: [
          {
            type: Schema.Types.ObjectId,
            ref: 'sensitivities',
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const TestReport = model<ITestReport, TestReportModel>(
  'TestReports',
  TestReportSchema
);
