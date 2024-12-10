import { model, Schema } from 'mongoose';
import { IDoctorSeal } from './seal.interface';


const doctorSealSchema = new Schema<IDoctorSeal>({
  title: {
    type: String,
  },
  seal: {
    type: String,
  },
});

export const DoctorSeal = model('DoctorSeal', doctorSealSchema);