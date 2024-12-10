import { Types } from 'mongoose';

export type IPatient = {
  name: string;
  fatherName: string;
  motherName?: string;
  age: string;
  gender: string;
  presentAddress: string;
  permanentAddress?: string;
  maritalStatus?: string;
  dateOfBirth?: string;
  district?: string;
  religion?: string;
  nationality?: string;
  admissionDate?: string;
  bloodGroup?: string;
  passportNo?: string;
  courseDuration?: string;
  typeOfDisease?: string;
  nationalID?: string;
  totalAmount?: string;
  uuid: string;
  ref_by?: Types.ObjectId;
  consultant?: Types.ObjectId;
  phone: string;
  email?: string;
  image?: string;
};
