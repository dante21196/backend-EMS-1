import { Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  website : string;
  plan : string;
  foundingYear ?: number;
  isActive: boolean;
  createdOn ?: Date;
}
