import { Sensitivity } from './sensitivity.model';
import { ISensitivity } from './sinsitivity.interfaces';

// For posting new sensitivity information
const post_sensitivity = async (
  payload: ISensitivity
): Promise<void | ISensitivity> => {
  const result = await Sensitivity.create(payload);
  return result;
};

export const sensitivity_service = {
  post_sensitivity,
};
