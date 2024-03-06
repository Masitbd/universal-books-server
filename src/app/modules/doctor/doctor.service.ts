import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAccount } from '../account/account.interface';
import { Account } from '../account/account.model';
import { generateDoctorAmountNumber } from './../../../utils/AllUserUtils';
import { doctorSearchableFields } from './doctor.constant';
import { IDoctor, IDoctorFilters } from './doctor.interface';
import { Doctor } from './doctor.model';

const createDoctor = async (payload: IDoctor): Promise<IDoctor |null> => {
  
  let newDoctorData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const amountNumber = await generateDoctorAmountNumber();

    const accountData = {
      uuid: '',
      balance: 0,
      balanceType: 'credit',
    } as IAccount;

    payload.account_number = amountNumber;
    accountData.uuid = amountNumber;

    const newAccount = await Account.create([accountData], { session });
    if (!newAccount.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Doctor');
    }

    payload.account_id = newAccount[0]._id;

    const newDoctor = await Doctor.create([payload], { session });
    if (!newDoctor.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Doctor');
    }
    newDoctorData = newDoctor[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return newDoctorData;
};

const updateDoctor = async (
  id: string,
  payload: Partial<IDoctor>
): Promise<IDoctor | null> => {
  const result = await Doctor.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteDoctor = async (id: string) => {
  const result = await Doctor.findOneAndDelete({ _id: id });
  return result;
};

const getAllDoctor = async (
  filters: IDoctorFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDoctor[]>> => {
  const { searchTerm } = filters;
  console.log(searchTerm);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: doctorSearchableFields.map(fields => ({
        [fields]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const whereConditionsData =
    andConditions.length > 0
      ? {
          $and: andConditions,
        }
      : {};

  const result = await Doctor.find(whereConditionsData).limit(limit).skip(skip);
  const total = await Doctor.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDoctor = async (id: string): Promise<IDoctor | null> => {
  const result = await Doctor.findOne({ _id: id }).populate('account_id');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  };

  return result;
};

export const DoctorServices = {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
};
