import { Model } from 'mongoose';

export type IBacteria = {
  label: string;
  value: string;
  description: string;
};

export type BacteriaModel = Model<IBacteria, Record<string, unknown>>;
