import { Document } from 'mongoose';

export type ISpecimen = {
  value: string;
  description: string;
  label: string;
} & Document;