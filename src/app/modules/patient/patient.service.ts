import { IPatient } from './patient.interface';
import { Patient } from './patient.model';

const postPatient = async (params: IPatient) => {
  const result = await Patient.create(params);
  return result;
};

export const PatientService = { postPatient };
