import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ISpecimen } from './specimen.interfaces';
import { Specimen } from './specimen.model';

// For posting new specimen information
const post_specimen = async (payload: ISpecimen): Promise<void | ISpecimen> => {
  const result = await Specimen.create(payload);
  return result;
};

// This function works for getting  a single specimen
const get_single_specimen = async (id: string) => {
  const result = await Specimen.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Specimen not found');
  }
  return result;
};

// This function works for finding all the specimen
const find_all_specimen = async (): Promise<ISpecimen[] | null> => {
  const result = await Specimen.find();
  return result;
};

// This function work for updating single specimen
const patch_specimen = async (
  payload: Partial<ISpecimen>,
  id: string
): Promise<ISpecimen | null> => {
  const result = await Specimen.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// This function work for deleting a single specimen
const delete_specimen = async (id: string) => {
  const result = await Specimen.findOneAndDelete({ _id: id });
  return result;
};

export const specimen_service = {
  post_specimen,
  find_all_specimen,
  get_single_specimen,
  patch_specimen,
  delete_specimen,
};
