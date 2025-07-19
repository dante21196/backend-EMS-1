import { Document } from 'mongoose';

export interface IUser extends Document {
  company_id?: string; // Optional field for company reference
  name: string;
  email: string;
  password: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
}
