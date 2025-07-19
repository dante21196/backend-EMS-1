import mongoose, { Schema } from 'mongoose';
import { IUser } from './interface';

const UserSchema = new Schema<IUser>({
  company_id : { type: Schema.Types.ObjectId, ref: 'Company' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role_id: { type: Number, default: 2 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
