import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICondition } from './condition.interface';
import { Condition } from './condition.model';

// Service function for posting new condition
const post_condition = async (
  payload: ICondition
): Promise<null | ICondition> => {
  const result = await Condition.create(payload);
  return result;
};

// Service function for getting all the condition
const get_condition = async () => {
  const result = await Condition.find();
  return result;
};

// Service function for getting a specific condition
const get_single_condition = async (id: string) => {
  const result = await Condition.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Condition not Found');
  }
  return result;
};
// Service function for patching a condition
const patch_condition = async (payload: Partial<ICondition>, id: string) => {
  const result = await Condition.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// Service function for deleting condition
const delete_condition = async (id: string) => {
  const result = await Condition.findOneAndDelete({ _id: id });
  return result;
};
export const condition_service = {
  post_condition,
  get_condition,
  get_single_condition,
  patch_condition,
  delete_condition,
};
