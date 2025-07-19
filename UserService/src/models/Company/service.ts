import Company from './schema';
import { ICompany } from './interface';

export const createCompany = async (companyData: Partial<ICompany>): Promise<ICompany> => {
  const company = new Company(companyData);
  return await company.save();
};

export const getCompanyByWebsite = async (website: string): Promise<ICompany | null> => {
  return await Company.findOne({ website });
};

export const getCompanyById = async (id: string): Promise<ICompany | null> => {
  return await Company.findById(id);
};

