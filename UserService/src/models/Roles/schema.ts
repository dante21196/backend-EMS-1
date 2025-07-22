import mongoose, { Schema } from 'mongoose';
import { IRole } from './interface';

const RoleSchema = new Schema<IRole>({
  role_id: { type: Number, required: true, unique: true },
  role_type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  permission_id : { type: Schema.Types.ObjectId, ref: 'Permission',required : true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IRole>('Role', RoleSchema);
