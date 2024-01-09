import { Schema, model } from 'mongoose';
import { ISpecimen } from './specimen.interfaces';

const SpecimenSchema = new Schema<ISpecimen>(
  {
    value: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Specimen = model<ISpecimen>('Specimens', SpecimenSchema);
