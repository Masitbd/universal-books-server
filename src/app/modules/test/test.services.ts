import { paginationHelpers } from '../../../helpers/paginationHelper';
import { testSearchableFields } from './test.constant';
import { ITest } from './test.interfacs';
import { Test } from './test.model';

const postTest = async (payload: ITest) => {
  const lastTest = await Test.find().sort({ testCode: -1 }).limit(1);

  const testId = lastTest.length > 0 ? Number(lastTest[0].testCode) : 0;
  const newTestId = testId + 1;

  const uniqueId = String(newTestId).padStart(4, '0');
  // const uniqueId = paddedCount.slice(0, 3) + (Number(paddedCount[3]) + 1);
  payload.testCode = uniqueId;
  const result = await Test.create(payload);
  return result;
};

const patchTest = async (id: string, payload: Partial<ITest>) => {
  console.log(payload);
  const result = await Test.findOneAndUpdate({ _id: id }, payload);
  return result;
};

const deleteTest = async (id: string) => {
  const result = await Test.findOneAndDelete({ _id: id });
  return result;
};

const fetchSingleTest = async (id: string) => {
  console.log(id, 'id');
  const result = await Test.findOne({ _id: id });
  return result;
};

const fetchAllTest = async (filterOption: any, options: any) => {
  const { searchTerm, ...filterOptions } = filterOption;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: testSearchableFields.map(field => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        };
      }),
    });
  }

  if (Object.keys(filterOptions).length > 0) {
    const filterConditions = Object.keys(filterOptions).map((field: any) => {
      return {
        [field]: filterOptions[field],
      };
    });

    andConditions.push({ $and: filterConditions });
  }
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const isCondition = andConditions.length > 0 ? { $and: andConditions } : {};
  const total = await Test.estimatedDocumentCount();

  const result = await Test.find(isCondition)
    .limit(limit)
    .skip(skip)
    .populate({ path: 'department' })
    .populate('specimen')
    .populate('groupTests')
    .populate('testTube')
    .populate('hospitalGroup')
    .populate('groupTests');

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const TestServices = {
  postTest,
  patchTest,
  deleteTest,
  fetchSingleTest,
  fetchAllTest,
};
