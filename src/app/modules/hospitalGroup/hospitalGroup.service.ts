import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IHospitalGroup } from './hospitalGroup.interface';
import { HospitalGroup } from './hospitalGroup.model';

const createHospitalGroup = async (
  payload: IHospitalGroup
): Promise<IHospitalGroup | null> => {
  const result = await HospitalGroup.create(payload);
  return result;
};
const getSingleHospitalGroup = async (
  id: string
): Promise<IHospitalGroup | null> => {
  const result = await HospitalGroup.findOne({ _id: id });
  return result;
};
const getAllHospitalGroup = async () => {
  const result = await HospitalGroup.find({});
  return result;
};

const updateHospitalGroup = async (
  id: string,
  payload: Partial<IHospitalGroup>
): Promise<IHospitalGroup | null> => {
  const isExist = await HospitalGroup.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hospital group not found !');
  }

  const result = await HospitalGroup.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteHospitalGroup = async (
  id: string
): Promise<IHospitalGroup | null> => {
  const isExist = await HospitalGroup.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hospital group not found!');
  }
  const result = await HospitalGroup.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );
  return result;
};

export const HospitalService = {
  createHospitalGroup,
  getSingleHospitalGroup,
  getAllHospitalGroup,
  updateHospitalGroup,
  deleteHospitalGroup,
};
