import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IHospitalGroup } from './hospitalGroup.interface';

const HospitalGroupSchema = new Schema<IHospitalGroup>(
  {
    hospitalGroupName: {
      type: String,
      required: true,
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

HospitalGroupSchema.pre('save', async function (next) {
  const isExist = await HospitalGroup.findOne({
    hospitalGroupName: {
      $regex: new RegExp('^' + this.hospitalGroupName + '$', 'i'),
    },
  });

  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Hospital group is already exist !'
    );
  }
  next();
});

export const HospitalGroup = model<IHospitalGroup>(
  'HospitalGroup',
  HospitalGroupSchema
);
