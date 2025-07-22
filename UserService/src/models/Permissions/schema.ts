import mongoose, { Schema } from 'mongoose';
import { IPermission } from './interface';

const PermissionSchema = new Schema<IPermission>({
  code: { type: String, required: true, unique: true },
  permission_matrix: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPermission>('Permission', PermissionSchema);
