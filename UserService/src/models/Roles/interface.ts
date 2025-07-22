import { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  role_id: number;
  role_type : string;
  name: string;
  description: string;
  permission_id: Schema.Types.ObjectId;
  createdAt: Date;
}
