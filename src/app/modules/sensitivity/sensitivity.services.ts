import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ISensitivity } from './sensitivity.interfaces';
import { Sensitivity } from './sensitivity.model';

// For posting new sensitivity information
const post_sensitivity = async (
  payload: ISensitivity
): Promise<void | ISensitivity> => {
  const result = await Sensitivity.create(payload);
  return result;
};

// Service function for patching existing Sensitivity
const patch_sensitivity = async (
  payload: Partial<ISensitivity>,
  id: string
): Promise<ISensitivity | null> => {
  const result = await Sensitivity.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// Service function for deleting a Sensitivity
const delete_sensitivity = async (id: string) => {
  const result = await Sensitivity.findOneAndDelete({
    _id: id,
  });
  return result;
};

// Service function for getting a single Sensitivity
const get_single_sensitivity = async (
  id: string
): Promise<null | ISensitivity> => {
  const result = await Sensitivity.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sensitivity not Found');
  }
  return result;
};
// Service function for finding all the Sensitivity
const find_all_sensitivity = async (): Promise<null | ISensitivity[]> => {
  const result = await Sensitivity.find();
  return result;
};
export const sensitivity_service = {
  post_sensitivity,
  patch_sensitivity,
  delete_sensitivity,
  find_all_sensitivity,
  get_single_sensitivity,
};
