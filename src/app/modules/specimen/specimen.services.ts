import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ISpecimen } from './specimen.interfaces';
import { Specimen } from './specimen.model';

// For posting new specimen information
const PostSpecimen = async (payload: ISpecimen): Promise<void | ISpecimen> => {
  const result = await Specimen.create(payload);
  return result;
};

// This function works for getting  a single specimen
const GetSingleSpecimen = async (id: string) => {
  const result = await Specimen.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Specimen not found');
  }
  return result;
};

// This function works for finding all the specimen
const FindAllSpecimen = async (): Promise<ISpecimen[] | null> => {
  const result = await Specimen.find();
  return result;
};

// This function work for updating single specimen
const PatchSpecimen = async (
  payload: Partial<ISpecimen>,
  id: string
): Promise<ISpecimen | null> => {
  const result = await Specimen.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// This function work for deleting a single specimen
const DeleteSpecimen = async (id: string) => {
  const result = await Specimen.findOneAndDelete({ _id: id });
  return result;
};

export const SpecimenService = {
  PostSpecimen,
  FindAllSpecimen,
  GetSingleSpecimen,
  PatchSpecimen,
  DeleteSpecimen,
};
