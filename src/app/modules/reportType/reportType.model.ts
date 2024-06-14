import { Schema, model } from 'mongoose';
import {
  IReportType,
  ITestForDescriptive,
  ITestForMicrobiology,
} from './reporttype.interface';

const reportTypeSchema = new Schema<IReportType>(
  {
    group: {
      type: String,
      required: true,
    },
    reportGroup: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ReportGroup',
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Departments',
    },
    resultType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const parameterBasedSchema = new Schema<IReportType>({
  testInfo: {
    test: {
      type: String,
      required: true,
    },
    investigation: {
      type: String,
      required: true,
    },
    normalValue: {
      type: String,
    },
    unit: {
      type: String,
    },
    hasPdrv: {
      type: Boolean,
      required: true,
      default: false,
    },
    pdrvValues: [
      {
        type: Schema.Types.ObjectId,
        ref: 'pdrvs',
      },
    ],
  },
});

const DescriptiveBasedSchema = new Schema<ITestForDescriptive>({
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const microbiologyBasedSchema = new Schema<ITestForMicrobiology>({
  sensitivityOpeions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'sensitivities',
    },
  ],
  conditions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'conditions',
    },
  ],
  bacterias: [
    {
      type: Schema.Types.ObjectId,
      ref: 'bacterias',
    },
  ],
});
export const ReportType = model('ReportType', reportTypeSchema);

export const ParameterBasedReportType = ReportType.discriminator(
  'parameterBased',
  parameterBasedSchema
);
export const DescriptiveBasedReportType = ReportType.discriminator(
  'descriptiveBased',
  DescriptiveBasedSchema
);
export const MicrobiologyBasedReportType = ReportType.discriminator(
  'microheterologicalBased',
  microbiologyBasedSchema
);
