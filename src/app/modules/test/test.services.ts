import { ITest } from './test.interfacs';
import { Test } from './test.model';

const postTest = async (payload: ITest) => {
  const testId = await Test.countDocuments();
  const paddedCount = String(testId).padStart(4, '0');
  const uniqueId = paddedCount.slice(0, 3) + (Number(paddedCount[3]) + 1);
  payload.testCode = uniqueId;
  const result = await Test.create(payload);
  return result;
};

const patchTest = async (id: string, payload: Partial<ITest>) => {
  const result = await Test.findOneAndUpdate({ _id: id }, payload);
  return result;
};

const deleteTest = async (id: string) => {
  const result = await Test.findOneAndDelete({ _id: id });
  return result;
};

const fetchSingleTest = async (id: string) => {
  const result = await Test.findOne({ _id: id });
  return result;
};
export const TestServices = {
  postTest,
  patchTest,
  deleteTest,
  fetchSingleTest,
};
