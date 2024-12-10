import { Schema, model } from 'mongoose';
import { ITestReport, TestReportModel } from './testReport.interfaces';

const TestReportSchema = new Schema<ITestReport, TestReportModel>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'order',
    },
    testId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Test',
    },
    defaultValue: [
      {
        type: Schema.Types.ObjectId,
        ref: 'pdrvs',
      },
    ],

    descriptiveDataDocs: {
      docsContent: {
        type: String,
      },
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
    },
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
            ref: 'Conditions',
          },
        ],
        growth: {
          type: Boolean,
        },
        colonyCount: {
          thenType: {
            type: String,
          },
          powerType: {
            type: String,
          },
        },
        bacterias: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Bacteria',
          },
        ],
        sensitivityOptions: [],
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
