import { Document } from 'mongoose';

export interface IPermission extends Document {
  code : string
  permission_matrix: Object;
  createdAt: Date;

}
