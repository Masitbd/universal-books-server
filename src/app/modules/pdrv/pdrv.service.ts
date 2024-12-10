import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPdrv } from './pdrv.interface';
import { Pdrv } from './pdrv.model';

const createPdrv = async (payload: IPdrv): Promise<void | IPdrv> => {
  const result = await Pdrv.create(payload);
  return result;
};

const updatePdrv = async (
  payload: Partial<IPdrv>,
  id: string
): Promise<IPdrv | null> => {
  const result = await Pdrv.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deletePdrv = async (id: string) => {
  const result = await Pdrv.findOneAndDelete({
    _id: id,
  });
  return result;
};

const getSinglePdrv = async (id: string): Promise<null | IPdrv> => {
  const result = await Pdrv.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pdrv not Found');
  }
  return result;
};

const getAllPdrv = async (): Promise<null | IPdrv[]> => {
  const result = await Pdrv.find();
  return result;
};
export const pdrvService = {
  createPdrv,
  updatePdrv,
  deletePdrv,
  getAllPdrv,
  getSinglePdrv,
};
