import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IDepartment } from './departments.interfaces';

const DepartmentSchema = new Schema<IDepartment>(
  {
    departmentName: {
      type: String,
      required: true,
    },
    doctorCommision: {
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

DepartmentSchema.pre('save', async function (next) {
  const isExist = await Department.findOne({
    departmentName: this.departmentName,
  });
  console.log(isExist);
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Department is already exist !');
  }
  next();
});

export const Department = model<IDepartment>('Departments', DepartmentSchema);
