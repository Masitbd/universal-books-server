import { IEmployeeFilterableFields } from './employeeRegistration.interface';

export const employeeFilterableFilds: IEmployeeFilterableFields[] = [
  'searchTerm',
  'label',
  'dateOfBirth',
  'phoneNo',
  'email',
];

export const employeeSearchableFields = ['label,', 'value', 'phoneNo', 'email'];
