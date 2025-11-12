import User from './schema';
import { IUser } from './interface';
import bcrypt from 'bcryptjs';

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(userData.password!, 10);
  const user = new User({ ...userData, password: hashedPassword });
  return await user.save();
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};
export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find({ isDeleted : false });
};