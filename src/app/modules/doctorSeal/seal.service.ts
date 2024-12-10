
import { IDoctorSeal } from './seal.interface';
import { DoctorSeal } from './seal.model';


// For posting new DoctorSeal information
const createDoctorSeal = async (
  payload: IDoctorSeal
): Promise<void | IDoctorSeal> => {
  const result = await DoctorSeal.create(payload);
  console.log(result);
  return result;
};

// This function works for getting  a single DoctorSeal
const getSingleDoctorSeal = async (id: string) => {
  const result = await DoctorSeal.findOne({ _id: id });
  return result;
};

// This function works for finding all the DoctorSeal
const getAllDoctorSeal = async (): Promise<IDoctorSeal[] | null> => {
  const result = await DoctorSeal.find();
  return result;
};

// This function work for updating single DoctorSeal
const updateDoctorSeal = async (
  payload: Partial<IDoctorSeal>,
  id: string
): Promise<IDoctorSeal | null> => {
  const result = await DoctorSeal.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// This function work for deleting a single DoctorSeal
const deleteDoctorSeal = async (id: string) => {
  const result = await DoctorSeal.findOneAndDelete({ _id: id });
  return result;
};

export const DoctorSealService = {
  createDoctorSeal,
  getAllDoctorSeal,
  getSingleDoctorSeal,
  updateDoctorSeal,
  deleteDoctorSeal,
};