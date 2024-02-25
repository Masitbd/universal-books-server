export type IDoctor = {
  name: string;
  fatherName: string;
  email: string;
  designation: string;
  phone: string;
  image?: string;
};

export type IDoctorFilters = {
  searchTerm?: string;
  name?: string;
  phone?: string;
  email?: string;
};
