import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBacteria } from './bacteria.interface';
import { Bacteria } from './bacteria.model';

const createBacteria = async (
  payload: IBacteria
): Promise<void | IBacteria> => {
  const result = await Bacteria.create(payload);
  return result;
};

const updateBacteria = async (
  payload: Partial<IBacteria>,
  id: string
): Promise<IBacteria | null> => {
  const result = await Bacteria.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBacteria = async (id: string) => {
  const result = await Bacteria.findOneAndDelete({
    _id: id,
  });
  return result;
};

const getSingleBacteria = async (id: string): Promise<null | IBacteria> => {
  const result = await Bacteria.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bacteria not Found');
  }
  return result;
};

const getAllBacteria = async (): Promise<null | IBacteria[]> => {
  const result = await Bacteria.find();
  return result;
};
export const BacteriaService = {
  createBacteria,
  updateBacteria,
  deleteBacteria,
  getAllBacteria,
  getSingleBacteria,
};
