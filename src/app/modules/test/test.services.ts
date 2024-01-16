import { paginationHelpers } from '../../../helpers/paginationHelper';
import { testSearchableFields } from './test.constant';
import { ITest, ItestFiltarableFields } from './test.interfacs';
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

const fetchAllTest = async (filterOption: ItestFiltarableFields[], options) => {
  console.log(filterOption);
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
  console.log(andConditions);

  if (Object.keys(filterOptions).length > 0) {
    const filterConditions = Object.keys(filterOptions).map(field => {
      return {
        [field]: filterOptions[field as string],
      };
    });

    andConditions.push({ $and: filterConditions });
  }
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const isCondition = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Test.find(isCondition)
    .limit(limit)
    .skip(skip)
    .populate({ path: 'department' })
    .populate('specimen');

  return {
    meta: {
      page,
      limit,
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
