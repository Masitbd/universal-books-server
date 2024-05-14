export type IEmployeeRegistration = {
  label: string;
  value: string;
  fatherName: string;
  motherName: string;
  gender: string;
  dateOfBirth: Date;
  age: number;
  religion: string;
  nationality: string;
  maritalStatus: string;
  presentAddress: string;
  parmanentAddress: string;
  district: string;
  phoneNo: string;
  email: string;
  image: string;
  defaultImage?: string;
};

export type IEmployeeFilterableFields =
  | 'searchTerm'
  | 'label'
  | 'dateOfBirth'
  | 'phoneNo'
  | 'email';
