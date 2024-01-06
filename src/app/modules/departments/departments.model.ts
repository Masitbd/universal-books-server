import { Schema, model } from 'mongoose';
import { IDepartment } from './departments.interfaces';

const DepartmentSchema = new Schema<IDepartment>(
  {
    department_name: {
      type: String,
      required: true,
    },
    doctor_commision: {
      type: Number,
      default: 0,
      required: true,
    },
    description: {
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

export const Departments = model<IDepartment>(
  'Departments',
  DepartmentSchema
);
