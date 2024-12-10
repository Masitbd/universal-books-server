import { IorderFilterableFields } from './order.interface';

export const orderFilterableFields: IorderFilterableFields[] = [
  'searchTerm',
  'deliveryTime',
  'patientType',
  'minDueAmount',
  'maxDueAmount',
  'minTotalPrice',
  'maxTotalPrice',
  'oid',
];

export const orderSearchAbleFields = [
  'patient.name',
  'patient.phone',
  'patient.email',
  'oid',
  'patient.uuid',
];
