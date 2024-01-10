import { Model } from "mongoose";

export type ISpecimen = {
  value: string;
  description: string;
  label: string;
}

export type SpecimenModel = Model<ISpecimen, Record<string, unknown>>;
