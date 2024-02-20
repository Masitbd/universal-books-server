import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IDoctor } from './doctor.interface';
import { Doctor } from './doctor.model';

const createDoctor = async (payload: IDoctor): Promise<IDoctor> => {
  const result = await Doctor.create(payload);
  return result;
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

const getAllDoctor = async (): Promise<IDoctor[] | null> => {
  const result = await Doctor.find();
  return result;
};

const getSingleDoctor = async (id: string): Promise<IDoctor | null> => {
  const result = await Doctor.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found');
  }

  return result;
};

export const DoctorServices = {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
};
