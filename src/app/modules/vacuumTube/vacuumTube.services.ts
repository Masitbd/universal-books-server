import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IVacuumTube } from './vacuumTube.interfaces';
import { VacuumTube } from './vacuumTube.models';
const createVacuumTube = async (payload: IVacuumTube): Promise<IVacuumTube> => {
  const result = await VacuumTube.create(payload);
  return result;
};

const updateVacuumTube = async (
  id: string,
  payload: Partial<IVacuumTube>
): Promise<IVacuumTube | null> => {
  const result = await VacuumTube.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteVacuumTube = async (id: string) => {
  const result = await VacuumTube.findOneAndDelete({ _id: id });
  return result;
};

const getAllVacuumTube = async (): Promise<IVacuumTube[] | null> => {
  const result = await VacuumTube.find();
  return result;
};

const getSingleVacuumTube = async (id: string): Promise<IVacuumTube | null> => {
  const result = await VacuumTube.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vacuum Tube not found');
  }

  return result;
};

export const VacuumTubeServices = {
  createVacuumTube,
  updateVacuumTube,
  deleteVacuumTube,
  getAllVacuumTube,
  getSingleVacuumTube
};
