import mongoose, { Schema } from 'mongoose';
import { ICompany } from './interface';

const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  website: { type: String, required: true, unique: true },
  plan: { type: String, required: true },
  foundingYear: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now },
  isDeleted : {type : Boolean,default : false}
});

export default mongoose.model<ICompany>('Company', CompanySchema);
