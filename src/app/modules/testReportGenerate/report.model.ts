import { model, Schema } from 'mongoose';
import { IReport, IReportForParameter } from './report.interface';

const reportSchema = new Schema<IReport>(
  {
    oid: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      set: (a: string) => (a === '' ? undefined : a),
    },
    doctorsSeal: {
      type: String,
      set: (a: string) => (a === '' ? undefined : a),
    },
    specimen: [
      {
        type: String,
        set: (a: string[]) => (a.length > 0 ? undefined : a),
      },
    ],
    conductedBy: {
      type: String,
      required: true,
    },
    reportGroup: {
      label: String,
      value: String,
      testResultType: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Report = model<IReport>('Reports', reportSchema);

// for parameterBased
const parameterBasedSchema = new Schema<IReportForParameter>(
  {
    testResult: [
      {
        test: {
          type: String,
          set: (a: string) => (a === '' ? undefined : a),
        },
        investigation: {
          type: String,
          set: (a: string) => (a === '' ? undefined : a),
          required: true,
        },
        normalValue: {
          type: String,
          set: (a: string) => (a === '' ? undefined : a),
        },
        result: {
          type: String,
          set: (a: string) => (a === '' ? undefined : a),
        },
        unit: {
          type: String,
          set: (a: string) => (a === '' ? undefined : a),
        },
        defaultValue: [
          {
            type: String,
            set: (a: string[]) => (a.length < 0 ? undefined : a),
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const ParameterBasedReport = Report.discriminator(
  'ParameterBased',
  parameterBasedSchema
);
