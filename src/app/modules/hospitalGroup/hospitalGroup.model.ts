import { model, Schema } from 'mongoose';
import { IHospitalGroup } from './hospitalGroup.interface';

const HospitalGroupSchema = new Schema<IHospitalGroup>(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const HospitalGroup = model<IHospitalGroup>(
  'HospitalGroup',
  HospitalGroupSchema
);
