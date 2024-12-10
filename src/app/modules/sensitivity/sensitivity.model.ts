import { Schema, model } from 'mongoose';
import { ISensitivity } from './sensitivity.interfaces';

const SensitivitySchema = new Schema<ISensitivity>(
  {
    value: {
      type: String,
      required: true,
      unique: true,
    },
    breakPoint: String,
    mic: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Sensitivity = model<ISensitivity>(
  'Sensitivities',
  SensitivitySchema
);
