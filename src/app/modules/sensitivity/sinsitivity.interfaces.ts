import { Document } from 'mongoose';
export type IResultField = {
  label: string;
  value: string;
} & Document;

export type ISensitivity = {
  value: string;
  label: string;
  description: string;
  result_option: IResultField[];
} & Document;
