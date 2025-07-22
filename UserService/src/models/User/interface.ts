import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  company_id: Schema.Types.ObjectId; // Optional field for company reference
  name: string;
  email: string;
  password: string;
  role_id: number;
  isActive: boolean;
  createdAt: Date;
}
